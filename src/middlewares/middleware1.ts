import createMiddleware from "next-intl/middleware";

export const locales = ["ar", "en"];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "ar",
});
