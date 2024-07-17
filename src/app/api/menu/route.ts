import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang");
  const categories = await db.category.findMany({
    include: {
      translation: {
        where: {
          language: lang!,
        },
      },
    },
  });
  const products = await db.product.findMany({
    include: {
      sizes: true,
      translation: true,
    },
  });

  return NextResponse.json({ categories, products });
}
