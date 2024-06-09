import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (req.nextUrl.pathname.includes("/dashboard") && !req.auth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl).toString());
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

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
