import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import moment from 'moment';
import { z } from 'zod';

const isoDateRegex = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-]\d{2}:\d{2}|Z)$/;

const paramSchema = z.object({
    userId: z.string().optional(),
    title: z.string().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
    startDate: z
        .string()
        .refine((val) => isoDateRegex.test(val), {
            message: 'startDate must be a valid ISO date',
        })
        .optional(),
    endDate: z
        .string()
        .refine((val) => isoDateRegex.test(val), {
            message: 'endDate must be a valid ISO date',
        })
        .optional(),
    currentPage: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
    sort: z.string().optional().default('createdAt'),
    order: z.string().optional().default('desc'),
});

type WhereType = {
    userId?: string;
    title?: { contains: string; mode: 'insensitive' };
    category?: { equals: string; mode: 'insensitive' };
    type?: { equals: string; mode: 'insensitive' };
    status?: { equals: string; mode: 'insensitive' };
    createdAt?: { gte?: string; lte?: string };
};

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        // eslint-disable-next-line prefer-const
        let { userId, title, sort, order, type, category, startDate, endDate, currentPage: page, pageSize } = paramSchema.parse(
            Object.fromEntries(searchParams.entries())
        );

        const where: WhereType = {
            ...(userId && { userId }),
            ...(title && { title: { contains: title, mode: 'insensitive' } }),
            ...(type && { type: { equals: type, mode: 'insensitive' } }),
            ...(category && { category: { equals: category, mode: 'insensitive' } }),
        };

        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) {
                const start = moment.utc(startDate).toISOString();
                where.createdAt.gte = start;
            }
            if (endDate) {
                const end = moment.utc(endDate).add(1, 'day').toISOString();
                where.createdAt.lte = end;
            }
        }

        const [transactions, totalTransactions] = await Promise.all([
            prisma.transaction.findMany({ where, orderBy: { [sort]: order }, skip: (page - 1) * pageSize, take: pageSize }),
            prisma.transaction.count({ where }),
        ]);

        return NextResponse.json({
            status: 200,
            data: transactions,
            message: 'Transactions fetched successfully',

            totalTransactions,
            page,
            pageSize,
            totalPages: Math.ceil(totalTransactions / pageSize),
        });
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch transactions: ${error}` }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, title, type, category, description, userId, status, paymentMethod } = body;

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        if (!amount || !title || !type || !category || !status || !paymentMethod) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const transaction = await prisma.transaction.create({
            data: {
                type,
                amount,
                title,
                category,
                description,
                date: moment().utc(true).toISOString(),
                status,
                paymentMethod,
                user: {
                    connect: { id: userId },
                },
                createdAt: moment(new Date()).utc(true).toISOString(),
                updatedAt: moment(new Date()).utc(true).toISOString(),
            },
        });

        return NextResponse.json(transaction, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json({ error: `Failed to create transaction: ${error}` }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const transactionId = searchParams.get('id');

        if (!transactionId) {
            return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
        }

        const existing = await prisma.transaction.findUnique({
            where: { id: transactionId },
        });
        if (!existing) {
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
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

        const updatedTransaction = await prisma.transaction.update({
            where: { id: transactionId },
            data: dataToUpdate,
        });

        return NextResponse.json(updatedTransaction);
    } catch (error) {
        console.error('Update transaction error:', error);
        return NextResponse.json(
            {
                error: `Failed to update transaction: ${error instanceof Error ? error.message : error}`,
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
            return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
        }

        const transaction = await prisma.transaction.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to delete transaction ${error}` }, { status: 500 });
    }
}
