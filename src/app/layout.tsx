import type { Metadata } from "next";

import "./globals.css";

// import localFont from "next/font/local";
import Providers from "@/components/Providers";
import { Cairo } from "next/font/google";

// const gess = localFont({
//   src: [{ path: "../fonts/GE_SS_Two_Light.otf" }],
//   weight: "400",
//   style: "normal",
// });

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Billa Sweet",
  description:
    "بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.",

  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_URL,
    title: "Billa Sweet",
    description:
      "بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.",
    images: [
      {
        url: "../opengraph-image.png",
        width: 800,
        height: 600,
        alt: "Billa Sweet",
      },
    ],
    siteName: "Billa Sweet",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Billa_Sweet_",
    creator: "@Billa_Sweet_",
    title: "Billa Sweet",
    description:
      "الدمّام حي الريان ٢-١١ مساءً ✨للطلب بنفس اليوم (فقط اتصال) 0507177844 ✨لطلب حجوزات مستقبليه: منسقه الطلبات 0502842888 ✨للاقتراحات 0505187012",
    images: [
      {
        url: "../opengraph-image.png",
        alt: "Billa Sweet",
      },
    ],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={cairo.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
