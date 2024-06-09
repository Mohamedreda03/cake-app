import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sesstion = await auth();
  const page = req.nextUrl.searchParams.get("page");
  const size = req.nextUrl.searchParams.get("size");

  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  const skip = (Number(page) - 1) * Number(size) || 0;
  const take = Number(size) || 10;

  const users = await db.user.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const usersCount = await db.user.count();
  const pageCount = Math.ceil(usersCount / Number(size));

  return NextResponse.json({ data: users, count: pageCount });
}
