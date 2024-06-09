import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");

  const categories = await db.category.findMany({
    where: {
      id: category!,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      products: true,
    },
  });

  return NextResponse.json({ data: categories });
}
