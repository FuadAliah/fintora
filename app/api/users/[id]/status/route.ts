import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UserStatus } from '@prisma/client'; // enum من prisma
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const statusSchema = z.object({
    status: z.enum(UserStatus),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ message: 'User Unauthorized' }, { status: 401 });

        const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
        if (!currentUser || currentUser.status === UserStatus.DEACTIVE) {
            return NextResponse.json({ message: 'User Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const body = await req.json();
        const { status } = statusSchema.parse(body);
        const user = await prisma.user.update({ where: { id }, data: { status } });

        return NextResponse.json({ message: `User status updated to ${status}`, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to update user status ${error}` }, { status: 500 });
    }
}
