"use server";

import { SignInFormTypes, SignInSchema } from "@/types/schema";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const signin = async (data: SignInFormTypes) => {
  const validatedFields = SignInSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
    return { success: "Logged in successfully!" };
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
