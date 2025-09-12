import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import z from 'zod';

const paramSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
    mobileNumber: z.string().optional(),
    defaultLanguage: z.string().optional(),
    isActive: z.string().optional(),
    createdAt: z.string().optional(),
    currentPage: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
    sort: z.string().optional().default('createdAt'),
    order: z.string().optional().default('desc'),
});
function buildWhere(params: z.infer<typeof paramSchema>): Prisma.UserWhereInput {
    const { firstName } = params;

    const where: Prisma.UserWhereInput = {
        ...(firstName && { firstName: { contains: firstName, mode: 'insensitive' } }),
    };

    return where;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const params = paramSchema.parse(Object.fromEntries(searchParams));
        const { currentPage, pageSize, sort, order } = params;

        const where = buildWhere(params);
        const skip = (currentPage - 1) * pageSize;
        const take = pageSize;

        const [data, total] = await Promise.all([
            prisma.user.findMany({ where, orderBy: { [sort]: order }, skip, take }),
            prisma.user.count({ where }),
        ]);

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data,
            totalUsers: total,
            page: currentPage,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        });
    } catch (error: unknown) {
        console.error('Error fetching totals:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
    }
}
