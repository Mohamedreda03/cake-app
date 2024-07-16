import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <main lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </main>
  );
}