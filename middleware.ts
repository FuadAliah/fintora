import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthRoutes } from './utils/routes';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (url.pathname.startsWith(AuthRoutes.RESET_PASSWORD) || url.pathname.startsWith('/api/auth') || url.pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    if (!token) {
        url.pathname = AuthRoutes.LOGIN;
        return NextResponse.redirect(url);
    }

    if (token?.forcePasswordChange) {
        url.pathname = AuthRoutes.RESET_PASSWORD;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/dashboard/:path*'],
};
