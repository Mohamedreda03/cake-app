import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const categories = await db.category.findMany();
  const products = await db.product.findMany({
    include: {
      sizes: true,
    },
  });

  return NextResponse.json({ categories, products });
}
