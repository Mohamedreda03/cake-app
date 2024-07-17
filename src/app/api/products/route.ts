import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Product, Size } from "@prisma/client";
import { create } from "domain";
import { NextRequest, NextResponse } from "next/server";

interface ProductTypres extends Product {
  sizes: {
    size: string;
    price: number;
    id: number;
  }[];
}

export async function GET(req: NextRequest) {
  const sesstion = await auth();
  const page = req.nextUrl.searchParams.get("page");
  const size = req.nextUrl.searchParams.get("size");
  const lang = req.nextUrl.searchParams.get("lang");

  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
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
    include: {
      sizes: true,
      translation: {
        where: {
          language: lang!,
        },
      },
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

  try {
    const product = await db.product.create({
      data: {
        image: body.image,
        best_seller: body.best_seller,
        categoryId: body.categoryId,
        translation: {
          createMany: {
            data: [
              {
                name: body.name_ar,
                language: "ar",
                description: body.description_ar,
              },
              {
                name: body.name_en,
                language: "en",
                description: body.description_en,
              },
            ],
          },
        },
        sizes: {
          createMany: {
            data: body.sizes.map((size: any) => ({
              price: size.price,
              size: size.size,
              id: undefined,
            })),
          },
        },
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
