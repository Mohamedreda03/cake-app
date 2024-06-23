"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const createProduct = async (data: any) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (session.user?.role === "USER") {
    return { error: "you should be admin." };
  }

  // console.log(data);

  // const product = await db.product.create({
  //   data,
  // });

  return { data: "product" };
};
