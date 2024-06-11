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

  const orders = await db.specialOrder.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const ordersCount = await db.product.count();
  const pageCount = Math.ceil(ordersCount / Number(size));

  return NextResponse.json({ data: orders, count: pageCount });
}

// /////////////////////////////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const order = await db.specialOrder.create({
      data: {
        cafe_name: body.cafe_name,
        order_maker_name: body.order_maker_name,
        address: body.address,
        phone: body.phone,
        payment_status: "PENDING",
        quantity: body.quantity,
        description: body.description,
        status: "PENDING",
      },
    });

    return NextResponse.json({ data: order });
  } catch (error: any) {
    console.log("ORDER CREATE ERROR:", error);

    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
