import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local";
import Providers from "@/components/Providers";

const gess = localFont({
  src: [{ path: "../fonts/GE_SS_Two_Light.otf" }],
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Billa Sweet",
  description:
    "بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={gess.className}>
        <link rel="icon" href="/logo-tap.webp" sizes="any" />
        <meta name="google-site-verification" content="google-site-verification: google405966e63aec60bb.html" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
