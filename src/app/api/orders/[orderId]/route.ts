import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const body = await req.json();

  await db.order.update({
    where: {
      id: params.orderId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json({ message: "ORDER updated successfully" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  await db.productOrder.deleteMany({
    where: {
      orderId: params.orderId,
    },
  });

  await db.specialItem.deleteMany({
    where: {
      orderId: params.orderId,
    },
  });

  await db.order.delete({
    where: {
      id: params.orderId,
    },
  });

  return NextResponse.json({ message: "ORDER deleted successfully" });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  const order = await db.order.findFirst({
    where: {
      id: params.orderId,
    },
    include: {
      _count: {
        select: { special_items: true },
      },
    },
  });

  return NextResponse.json({ data: order });
}
