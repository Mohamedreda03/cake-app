import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { sizeId: string } }
) => {
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

    const newSize = await db.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        size,
        price,
        productId,
      },
    });

    return NextResponse.json({ data: newSize });
  } catch (error) {
    console.log("SIZE UPDATE ERROR: ", error);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { sizeId: string } }
) => {
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

    await db.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json({ data: "deleted" });
  } catch (error) {
    console.log("SIZE DELETE ERROR: ", error);
  }
};
