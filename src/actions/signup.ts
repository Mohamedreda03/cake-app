"use server";
import bcrypt from "bcryptjs";

import { SignUpFormTypes, SignUpSchema } from "@/types/schema";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const signup = async (data: SignUpFormTypes) => {
  const validatedFields = SignUpSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  redirect("/sign-in");

  return { success: "register successfully." };
};

export default signup;
