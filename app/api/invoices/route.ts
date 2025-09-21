import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { InvoiceStatus, PaymentType, Prisma } from '@prisma/client';
import moment from 'moment';
import { z } from 'zod';

const paramSchema = z.object({
    invoiceNumber: z.string().optional(),
    customerId: z.string().optional(),
    invoiceStatus: z.enum(InvoiceStatus).optional(),
    paymentType: z.enum(PaymentType).optional(),
    products: z.string().optional(),
    currentPage: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
    sort: z.string().default('createdAt'), // optional().default() مش ضروري
    order: z.enum(['asc', 'desc']).default('desc'), // أحسن بدل string عادية
});

type ProductType = { productId: string; productPrice: number; quantity: number };

function buildWhere(params: z.infer<typeof paramSchema>): Prisma.InvoiceWhereInput {
    const { invoiceNumber } = params;

    const where: Prisma.InvoiceWhereInput = {
        ...(invoiceNumber && { invoiceNumber: { contains: invoiceNumber } }),
    };

    return where;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const params = paramSchema.parse(Object.fromEntries(searchParams.entries()));
        const { currentPage, pageSize, sort, order } = params;

        const where = buildWhere(params);
        const skip = (currentPage - 1) * pageSize;
        const take = pageSize;

        const [data, totalData] = await Promise.all([
            prisma.invoice.findMany({
                where,
                orderBy: { [sort]: order },
                skip,
                take,
                include: {
                    products: {
                        include: {
                            product: true, // يرجع تفاصيل المنتج المرتبط
                        },
                    },
                },
            }),
            prisma.invoice.count({ where }),
        ]);

        return NextResponse.json({
            status: 200,
            data,
            message: 'Invoices fetched successfully',

            totalData,
            page: currentPage,
            pageSize,
            totalPages: Math.ceil(totalData / pageSize),
        });
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch invoices: ${error}` }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, customerId, paymentType, invoiceStatus, description, products } = body;

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const productsDB = await prisma.product.findMany({
            where: {
                id: {
                    in: body.products.map((product: ProductType) => product.productId),
                },
            },
        });

        const subTotal = products.reduce((sum: number, p: ProductType) => sum + Number(p.productPrice) * Number(p.quantity), 0);
        const tax = products.reduce((sum: number, p: ProductType) => {
            const foundProduct = productsDB.find((prod) => prod.id === p.productId);
            return sum + Number(p.productPrice) * Number(p.quantity) * Number(foundProduct?.tax);
        }, 0);
        const total = subTotal + tax;

        const invoice = await prisma.invoice.create({
            data: {
                invoiceNumber: `INV-${(await prisma.invoice.count()) + 130 + 1}`,
                createdById: userId,
                paymentType,
                invoiceStatus,
                description,

                ...(customerId ? { customer: { connect: { id: customerId } } } : {}),

                subTotal,
                tax,
                total,

                dueDate: moment().add(30, 'days').utc().toISOString(),

                products: {
                    create: products.map((pro: ProductType) => {
                        const foundProduct = productsDB.find((p) => p.id === pro.productId) || { unitPrice: 0, tax: 0 };
                        const productPrice = pro.productPrice ?? foundProduct.unitPrice; // total price of the product without tax
                        const productTax = productPrice * +foundProduct?.tax; // tax of the product
                        const totalPrice = productPrice + productTax; // total price of the product including tax
                        return {
                            product: { connect: { id: pro.productId } },
                            quantity: pro.quantity,
                            productPrice,
                            productTax,
                            totalPrice,
                        };
                    }),
                },
            },
            include: {
                createdBy: true,
                products: { include: { product: true } },
            },
        });

        return NextResponse.json(invoice, { status: 201 });
    } catch (error) {
        console.error('Error creating invoice:', error);
        return NextResponse.json({ error: `Failed to create invoice: ${error}` }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const invoiceId = searchParams.get('id');

        if (!invoiceId) {
            return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
        }

        const existing = await prisma.invoice.findUnique({
            where: { id: invoiceId },
        });
        if (!existing) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        const { amount, title, type, category, description, status, paymentMethod } = await req.json();

        const dataToUpdate = {
            ...(amount !== undefined && { amount }),
            ...(title !== undefined && { title }),
            ...(type !== undefined && { type }),
            ...(category !== undefined && { category }),
            ...(description !== undefined && { description }),
            ...(status !== undefined && { status }),
            ...(paymentMethod !== undefined && { paymentMethod }),
            updatedAt: new Date(),
        };

        if (Object.keys(dataToUpdate).length === 1) {
            return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
        }

        const updatedInvoice = await prisma.invoice.update({
            where: { id: invoiceId },
            data: dataToUpdate,
        });

        return NextResponse.json(updatedInvoice);
    } catch (error) {
        console.error('Update invoice error:', error);
        return NextResponse.json(
            {
                error: `Failed to update invoice: ${error instanceof Error ? error.message : error}`,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
        }

        const invoice = await prisma.invoice.findUnique({
            where: { id },
        });

        if (!invoice) {
            throw new Error('Invoice not found');
        }

        await prisma.invoice.delete({
            where: { id },
        });

        return NextResponse.json(invoice, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to delete invoice ${error}` }, { status: 500 });
    }
}
