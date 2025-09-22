import prisma from '@/lib/prisma';
import { Language, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import z from 'zod';

const querySchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
    mobileNumber: z.string().optional(),
    defaultLanguage: z.string().optional(),
    isActive: z.string().optional(),

    // pagination + sorting
    currentPage: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
    sort: z.string().optional().default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
});

const createUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    image: z.string().optional(),
    mobileNumber: z.string().optional(),
    defaultLanguage: z.enum(Language).default(Language.EN),
    tempPassword: z.string().min(6),
});

const updateUserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    mobileNumber: z.string().optional(),
    defaultLanguage: z.enum(Language).optional(),
    image: z.string().optional(),
    isActive: z.boolean().optional(),
});

function buildWhere(params: z.infer<typeof querySchema>): Prisma.UserWhereInput {
    const { firstName } = params;

    const where: Prisma.UserWhereInput = {
        ...(firstName && { firstName: { contains: firstName, mode: 'insensitive' } }),
    };

    return where;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const params = querySchema.parse(Object.fromEntries(searchParams));
        const { currentPage, pageSize, sort, order } = params;

        const allowedSort = ['createdAt', 'email', 'firstName', 'lastName'];
        const sortField = allowedSort.includes(sort) ? sort : 'createdAt';

        const where = buildWhere(params);
        const skip = (currentPage - 1) * pageSize;
        const take = pageSize;

        const [data, total] = await Promise.all([
            prisma.user.findMany({ where, orderBy: { [sortField]: order }, skip, take }),
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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = createUserSchema.parse(body);
        const { firstName, lastName, email, mobileNumber, tempPassword } = data;

        if (!email || !tempPassword) {
            return NextResponse.json({ error: 'Email and tempPassword are required' }, { status: 400 });
        }

        // Hash the temp password before saving
        const hashedTempPassword = await hash(tempPassword, 12);

        const user = await prisma.user.create({
            data: {
                firstName: firstName || '',
                lastName: lastName || '',
                email,
                mobileNumber: mobileNumber || '',
                passwordHash: hashedTempPassword,
                tempPassword: hashedTempPassword,
                forcePasswordChange: true,
                isActive: false,
            },
        });

        return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: `Internal Server Error ${error}` }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const body = await req.json();
        const data = updateUserSchema.parse(body);

        const user = await prisma.user.update({
            where: { id: id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                mobileNumber: data.mobileNumber,
                defaultLanguage: (data.defaultLanguage as Language) || Language.EN,
                image: data.image,
                isActive: data.isActive,
            },
        });

        return NextResponse.json({ user, message: 'User updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to update user ${error}` }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const user = await prisma.user.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to delete user ${error}` }, { status: 500 });
    }
}
