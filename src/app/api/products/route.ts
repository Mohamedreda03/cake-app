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

  const products = await db.product.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const productsCount = await db.product.count();
  const pageCount = Math.ceil(productsCount / Number(size));

  return NextResponse.json({ data: products, count: pageCount });
}

// /////////////////////////////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }

  if (sesstion?.user?.role === "USER") {
    return NextResponse.json(
      { error: "you should be admin." },
      { status: 403 }
    );
  }

  body.price = Number(body.price);

  if (
    !body.name ||
    !body.price ||
    !body.size ||
    !body.categoryId ||
    !body.image ||
    !body.description
  ) {
    return NextResponse.json(
      { error: "all fields are required" },
      { status: 400 }
    );
  }

  try {
    const product = await db.product.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json({ data: product });
  } catch (error: any) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
