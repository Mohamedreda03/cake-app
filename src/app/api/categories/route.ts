import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

  const category = await db.category.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },

    include: {
      _count: {
        select: { products: true },
      },
      translation: {
        where: {
          language: lang!,
        },
      },
    },
  });

  const categoryCount = await db.category.count();
  const pageCount = Math.ceil(categoryCount / Number(size));

  return NextResponse.json({ data: category, count: pageCount });
}

export async function POST(req: NextRequest) {
  const sesstion = await auth();
  if (!sesstion) {
    NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (sesstion?.user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  const body = await req.json();

  const category = await db.category.create({
    data: {
      translation: {
        createMany: {
          data: [
            {
              name: body.name_ar,
              language: "ar",
            },
            {
              name: body.name_en,
              language: "en",
            },
          ],
        },
      },
    },
  });

  return NextResponse.json({ data: category });
}
