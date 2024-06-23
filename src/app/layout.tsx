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
  title: {
    default: "Bella Sweet",
    template: "%s - Bella Sweet",
  },
  description:
    "بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.",
  twitter: {
    card: "summary_large_image",
    site: "@Billa_Sweet_",
    description:
      "الدمّام حي الريان ٢-١١ مساءً ✨للطلب بنفس اليوم (فقط اتصال) 0507177844 ✨لطلب حجوزات مستقبليه: منسقه الطلبات 0502842888 ✨للاقتراحات 0505187012",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={gess.className}>
        {/* <link rel="icon" href="/logo-tap.webp" sizes="any" /> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
