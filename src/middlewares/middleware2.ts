import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = auth((req) => {
  if (req.nextUrl.pathname.includes("/dashboard") && !req.auth) {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  if (
    (req.nextUrl.pathname.includes("/sign-up") ||
      req.nextUrl.pathname.includes("/sign-in")) &&
    req.auth
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  if (
    req.nextUrl.pathname.includes("/dashboard") &&
    req.auth?.user.role === "USER"
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  return NextResponse.next();
});
