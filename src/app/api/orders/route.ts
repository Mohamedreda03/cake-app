import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CartItemType } from "@/store/cartStore";
import { SpecialItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
    where: {
      status: {
        not: "FAILED",
      },
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
  try {
    const body = await req.json();

    if (body.payment_id) {
      const oldOrder = await db.order.findFirst({
        where: {
          payment_id: body.payment_id,
        },
      });

      if (oldOrder) {
        return NextResponse.json(
          { error: "order already exists" },
          { status: 400 }
        );
      }
    }

    if (!body.address_id) {
      await db.address.create({
        data: {
          userId: body.userId,
          cafe_name: body.cafe_name,
          order_maker_name: body.order_maker_name,
          address: body.address,
          phone: body.phone,
        },
      });
    } else {
      await db.address.update({
        where: {
          id: body.address_id,
        },
        data: {
          cafe_name: body.cafe_name,
          order_maker_name: body.order_maker_name,
          address: body.address,
          phone: body.phone,
        },
      });
    }

    const order = await db.order.create({
      data: {
        userId: body.userId,
        cafe_name: body.cafe_name,
        order_maker_name: body.order_maker_name,
        address: body.address,
        phone: body.phone,
        payment_status: body.payment_status || "PENDING",
        total: body.total,
        status: body.status || "PENDING",
        payment_id: body.payment_id || "",
        order_receipt_date: body.order_receipt_date,
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
              special_id: undefined,
              size: item.size,
              price: item.price,
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
