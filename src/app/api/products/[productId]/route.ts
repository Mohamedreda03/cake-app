import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }
  const body = await req.json();

  body.price = parseInt(body.price);
  await db.product.update({
    where: {
      id: params.productId,
    },
    data: {
      name: body.name,
      description: body.description,
      category: {
        connect: {
          id: body.categoryId,
        },
      },
      best_seller: body.best_seller,
      image: body.image,
    },
  });

  return NextResponse.json({ message: "Product updated successfully" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  await db.product.delete({
    where: {
      id: params.productId,
    },
  });

  return NextResponse.json({ message: "Product deleted successfully" });
}
