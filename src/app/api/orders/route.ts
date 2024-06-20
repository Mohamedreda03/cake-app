import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CartItemType } from "@/store/cartStore";
import { ProductOrder, SpecialItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { spec } from "node:test/reporters";

export async function GET(req: NextRequest) {
  const sesstion = await auth();
  const page = req.nextUrl.searchParams.get("page");
  const size = req.nextUrl.searchParams.get("size");

  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  const skip = (Number(page) - 1) * Number(size) || 0;
  const take = Number(size) || 10;

  const orders = await db.order.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { special_items: true },
      },
    },
  });

  const ordersCount = await db.order.count();

  const pageCount = Math.ceil(ordersCount / Number(size));

  return NextResponse.json({ data: orders, count: pageCount });
}

// /////////////////////////////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const order = await db.order.create({
      data: {
        cafe_name: body.cafe_name,
        order_maker_name: body.order_maker_name,
        address: body.address,
        phone: body.phone,
        payment_status: body.payment_status || "PENDING",
        total: body.total,
        status: body.status || "PENDING",
        payment_id: body.payment_id || "",
        special_items: body.special_items && {
          createMany: {
            data: body.special_items.map((item: SpecialItem) => ({
              ...item,
              id: undefined,
            })),
          },
        },
        products: {
          createMany: {
            data: body.items.map((item: CartItemType) => ({
              ...item,
              id: undefined,
              orderId: undefined,
              sizes: undefined,
              special_id: undefined,
              size: item.size.size,
              price: item.size.price,
              best_seller: undefined,
              categoryId: undefined,
            })),
          },
        },
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
