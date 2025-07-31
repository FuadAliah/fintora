import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Routes } from "./utils/routes";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPage = req.nextUrl.pathname.startsWith(Routes.LOGIN);

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL(Routes.OVERVIEW.url, req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL(Routes.LOGIN, req.url));
  }

  return NextResponse.next();
}
