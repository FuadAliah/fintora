import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email, newPassword } = await req.json();

        if (!email || !newPassword) {
            return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
        }

        const newHash = await hash(newPassword, 12);

        const updated = await prisma.user.updateMany({
            where: { email },
            data: {
                passwordHash: newHash,
                tempPassword: "",
                forcePasswordChange: false,
            },
        });

        if (updated.count === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Password reset successful', user: updated }, { status: 200 });
    } catch (error) {
        console.error('RESET PASSWORD ERROR:', error);
        return NextResponse.json({ error: 'Failed to reset password', details: String(error) }, { status: 500 });
    }
}
