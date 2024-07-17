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

  const productTrans = await db.productTranslation.findMany({
    where: {
      productId: params.productId,
    },
  });

  await db.productTranslation.updateMany({
    where: {
      id: productTrans[0].id,
    },
    data: {
      name: body.name_ar,
      description: body.description_ar,
    },
  });
  await db.productTranslation.updateMany({
    where: {
      id: productTrans[1].id,
    },
    data: {
      name: body.name_en,
      description: body.description_en,
    },
  });

  await db.product.update({
    where: {
      id: params.productId,
    },
    data: {
      best_seller: body.best_seller,
      categoryId: body.categoryId,
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

  await db.productTranslation.deleteMany({
    where: {
      productId: params.productId,
    },
  });
  await db.size.deleteMany({
    where: {
      productId: params.productId,
    },
  });

  await db.product.delete({
    where: {
      id: params.productId,
    },
  });

  return NextResponse.json({ message: "Product deleted successfully" });
}
