import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local";
import Providers from "@/components/Providers";

const gess = localFont({
  src: [{ path: "../fonts/GE_SS_Two_Light.otf" }],
  weight: "400",
  style: "normal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={gess.className}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
