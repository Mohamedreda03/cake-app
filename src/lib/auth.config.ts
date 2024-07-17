import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { SignInSchema } from "@/types/schema";
import { db } from "./db";
import bcrypt from "bcryptjs";

import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

enum Role {
  ADMIN = "ADMIN",
  CHEF = "CHEF",
  ACCOUNTANT = "ACCOUNTANT",
  USER = "USER",
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    role: Role;
  }
}

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { password, email } = validatedFields.data;
          try {
            const user = await db.user.findUnique({
              where: {
                email,
              },
            });
            if (!user || !user.password) {
              return null;
            }
            const isValidePassword = await bcrypt.compare(
              password,
              user.password
            );
            if (isValidePassword) {
              return {
                ...user,
                role: user.role,
              };
            }
          } catch (error) {
            console.log("credentials error", error);
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userData = await db.user.findUnique({
          where: {
            id: token.sub!,
          },
          select: {
            role: true,
          },
        });
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: userData?.role,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;

      return session;
    },
  },
} satisfies NextAuthConfig;
