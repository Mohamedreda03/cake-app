import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

export const locales = ["ar", "en"];

const publicPages = [
  "/",
  "/sign-in",
  "/sign-up",
  "/menu",
  "/story",
  "/about",
  "/contact",
  "/cart",
  "/factory",
];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "ar",
});

const authMiddleware = auth((req) => {
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

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
