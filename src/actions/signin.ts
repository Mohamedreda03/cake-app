"use server";
import bcrypt from "bcryptjs";

import { SignInFormTypes, SignInSchema } from "@/types/schema";

import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import { signIn } from "@/auth";

const signin = async (data: SignInFormTypes) => {
  const validatedFields = SignInSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return { error: "The user does not exist" };
    }

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      return { error: "The password is incorrect" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "You have been logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Internal server error!" };
      }
    }
    throw error;
  }
};

export default signin;
