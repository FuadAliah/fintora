export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserStatus } from '@prisma/client';

const resetPasswordSchema = z.object({
    forcePasswordChange: z.boolean(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
        if (!currentUser || currentUser.status === UserStatus.DEACTIVE) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const body = await req.json();
        const { forcePasswordChange } = resetPasswordSchema.parse(body);
        const user = await prisma.user.update({ where: { id }, data: { forcePasswordChange } });

        return NextResponse.json(
            {
                message: `User ${user.id} has been updated to force password change`,
                user: user,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: `Failed to update user status ${error}` }, { status: 500 });
    }
}
