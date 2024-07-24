import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }
  const body = await req.json();

  let data: any = {
    name: body.name,
    email: body.email,
    role: body.role,
  };

  if (body.password) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    data.password = hashedPassword;
  }

  await db.user.update({
    where: {
      id: params.userId,
    },
    data: data,
  });

  return NextResponse.json({ message: "User updated successfully" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  const user = await db.user.delete({
    where: {
      id: params.userId,
    },
  });

  return NextResponse.json({ message: "User deleted successfully" });
}
