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
  "/factory",
  "/cart",
];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "ar",
  localeDetection: false,
});

const authMiddleware = auth((req) => {
  // if (req.nextUrl.pathname.includes("/dashboard") && !req.auth) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  // }

  // if (
  //   (req.nextUrl.pathname.includes("/sign-up") ||
  //     req.nextUrl.pathname.includes("/sign-in")) &&
  //   req.auth
  // ) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  // }

  // if (
  //   req.nextUrl.pathname.includes("/dashboard") &&
  //   req.auth?.user.role === "USER"
  // ) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  // }

  // if (!req.auth && req.nextUrl.pathname.includes("/orders")) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  // }

  // return intlMiddleware(req);

  const session = req.auth;

  if (session) {
    return intlMiddleware(req);
  }
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
  // matcher: "/:path*",
};

// export default async function middleware(req: NextRequest) {
//   const publicPathnameRegex = RegExp(
//     `^(/(${locales.join("|")}))?(${publicPages
//       .flatMap((p) => (p === "/" ? ["", "/"] : p))
//       .join("|")})/?$`,
//     "i"
//   );
//   const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
//   if (isPublicPage) {
//     return intlMiddleware(req);
//   } else {
//     return (authMiddleware as any)(req);
//   }
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)",
//   ],
// };

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|hero-6.webp|logo.svg|public|icons).*)",
//   ],
//   // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
