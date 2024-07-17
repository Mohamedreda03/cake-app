import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }
  const body = await req.json();

  const categoryLangs = await db.categoryTranslation.findMany({
    where: {
      categoryId: params.categoryId,
    },
  });

  await db.categoryTranslation.update({
    where: {
      id: categoryLangs[0].id,
    },
    data: {
      name: body.name_ar,
    },
  });
  await db.categoryTranslation.update({
    where: {
      id: categoryLangs[1].id,
    },
    data: {
      name: body.name_en,
    },
  });

  return NextResponse.json(
    { message: "Category updated successfully" },
    { status: 200 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  const products = await db.product.findFirst({
    where: {
      categoryId: params.categoryId,
    },
  });

  if (products) {
    return NextResponse.json(
      {
        message: "Category has products, please delete the products first",
      },
      { status: 400 }
    );
  }

  await db.categoryTranslation.deleteMany({
    where: {
      categoryId: params.categoryId,
    },
  });

  await db.category.delete({
    where: {
      id: params.categoryId,
    },
  });

  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  const category = await db.category.findFirst({
    where: {
      id: params.categoryId,
    },
    include: {
      translation: true,
    },
  });

  return NextResponse.json({ data: category }, { status: 200 });
}
