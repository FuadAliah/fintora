import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const users = await prisma.user.findMany({
      where: {
        id: userId ? userId : undefined,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch users: ${error}` },
      { status: 500 }
    );
  }
}
