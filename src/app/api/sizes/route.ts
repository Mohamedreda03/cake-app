import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { size, price, productId } = await req.json();
  try {
    const sesstion = await auth();
    if (!sesstion) {
      NextResponse.redirect(new URL("/login", req.nextUrl).toString());
    }

    if (sesstion?.user?.role === "USER") {
      return NextResponse.json(
        { error: "you should be admin or writer." },
        { status: 403 }
      );
    }

    if (!size || !price) {
      return NextResponse.json(
        { error: "all fields are required" },
        { status: 400 }
      );
    }

    const newSize = await db.size.create({
      data: {
        size,
        price,
        productId,
      },
    });

    return NextResponse.json({ data: newSize });
  } catch (error) {
    console.log("SIZE ERROR: ", error);
  }
};

export const GET = async (req: NextRequest) => {
  const productId = req.nextUrl.searchParams.get("productId");
  try {
    const sesstion = await auth();
    if (!sesstion) {
      NextResponse.redirect(new URL("/login", req.nextUrl).toString());
    }

    if (sesstion?.user?.role === "USER") {
      return NextResponse.json(
        { error: "you should be admin or writer." },
        { status: 403 }
      );
    }

    const sizes = await db.size.findMany({
      where: {
        productId: productId!,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: sizes });
  } catch (error) {
    console.log("SIZE ERROR: ", error);
  }
};
