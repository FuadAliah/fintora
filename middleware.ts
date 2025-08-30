import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Routes } from './utils/routes';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthPage = req.nextUrl.pathname.startsWith(Routes.LOGIN);
    const dashboard = req.nextUrl.pathname.startsWith('/dashboard');
    // const isApiRoute = req.nextUrl.pathname.startsWith('/api');

    // if (!token && isApiRoute) {
    //     return NextResponse.redirect(new URL(Routes.LOGIN, req.url));
    // }

    if (!token && dashboard) {
        return NextResponse.redirect(new URL(Routes.LOGIN, req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL(Routes.OVERVIEW.url, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*', '/dashboard/:path*'],
};
