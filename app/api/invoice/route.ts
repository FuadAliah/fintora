import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { InvoiceStatus, InvoiceType, PaymentStatus, Prisma } from '@prisma/client';
import moment from 'moment';
import { z } from 'zod';

const paramSchema = z.object({
    invoiceNumber: z.string().optional(),
    customerId: z.string().optional(),
    status: z.enum(InvoiceStatus).optional(),
    type: z.enum(InvoiceType).optional(),
    paymentStatus: z.enum(PaymentStatus).optional(),
    startDate: z
        .string()
        .refine((val) => moment(val).isValid(), { message: 'startDate must be a valid date' })
        .optional(),
    endDate: z
        .string()
        .refine((val) => moment(val).isValid(), { message: 'endDate must be a valid date' })
        .optional(),
    currentPage: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
    sort: z.string().optional().default('issueDate'),
    order: z.string().optional().default('desc'),
});

function buildWhere(params: z.infer<typeof paramSchema>): Prisma.InvoiceWhereInput {
    const { invoiceNumber, type, status, paymentStatus, startDate, endDate } = params;

    const where: Prisma.InvoiceWhereInput = {
        ...(invoiceNumber && { invoiceNumber: { contains: invoiceNumber } }),
        ...(type && { type: { equals: type } }),
        ...(status && { status: { equals: status } }),
        ...(paymentStatus && { paymentStatus: { equals: paymentStatus } }),
    };

    if (startDate || endDate) {
        where.issueDate = {};
        if (startDate) {
            where.issueDate.gte = moment.utc(startDate).toISOString();
        }
        if (endDate) {
            where.issueDate.lte = moment.utc(endDate).endOf('day').toISOString();
        }
    }

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
            prisma.invoice.findMany({ where, orderBy: { [sort]: order }, skip, take }),
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
        const { userId, type, status, paymentStatus, subtotal, tax, total, description } = body;

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        if (!type || !status || !paymentStatus || !subtotal || !tax || !total || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const invoice = await prisma.invoice.create({
            data: {
                invoiceNumber: `INV-${(await prisma.invoice.count()) + 130 + 1}`,
                type,
                status,
                paymentStatus,
                subtotal,
                tax: tax || 0,
                total,
                description,
                dueDate: moment().add(30, 'days').utc().toISOString(),
                createdBy: { connect: { id: userId } },
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

        const invoice = await prisma.invoice.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json(invoice, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to delete invoice ${error}` }, { status: 500 });
    }
}
