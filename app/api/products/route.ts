import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const paramSchema = z.object({
    englishName: z.string().optional(),
    customerId: z.string().optional(),
    currentPage: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
    sort: z.string().optional().default('createdAt'),
    order: z.string().optional().default('desc'),
});
function buildWhere(params: z.infer<typeof paramSchema>): Prisma.ProductWhereInput {
    const { englishName, currentPage, pageSize, sort, order } = params;

    const where: Prisma.ProductWhereInput = {
        ...(englishName && { englishName: { contains: englishName } }),
        ...(currentPage && pageSize && { skip: (currentPage - 1) * pageSize, take: pageSize }),
        ...(sort && order && { orderBy: { [sort]: order as Prisma.SortOrder } }),
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
            prisma.product.findMany({ where, orderBy: { [sort]: order }, skip, take }),
            prisma.product.count({ where }),
        ]);

        return NextResponse.json({
            status: 200,
            data,
            message: 'Invoices fetched successfully',

            totalData,
            page: currentPage,
            pageSize,
            totalPages: Math.ceil(totalData / +pageSize),
        });
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch products: ${error}` }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { englishName, arabicName, description, unitPrice, tax } = body;

        // if (!userId) {
        //     return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        // }

        // if (!type || !status || !paymentStatus || !subtotal || !tax || !total || !description) {
        //     return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        // }

        const product = await prisma.product.create({
            data: {
                englishName,
                arabicName,
                description,
                unitPrice,
                tax,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: `Failed to create product: ${error}` }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const product = await prisma.product.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to delete product ${error}` }, { status: 500 });
    }
}
