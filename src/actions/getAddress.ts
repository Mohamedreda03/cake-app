"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getAddress = async () => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const address = await db.address.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  return address;
};
