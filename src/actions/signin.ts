"use server";
import bcrypt from "bcryptjs";

import { SignInFormTypes, SignInSchema } from "@/types/schema";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";

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
      return { error: "الايمال غير صحيح" };
    }

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      return { error: "الباسورد غير صحيح" };
    }

    if (user.role === "USER") {
      return { error: "ليس لديك الصلاحية للدخول" };
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard/products",
    });

    console.log(res);

    return { success: "تم تسجيل الدخول بنجاج" };
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
