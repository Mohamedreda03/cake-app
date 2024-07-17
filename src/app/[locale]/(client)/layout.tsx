import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { cn } from "@/lib/utils";
import { Cairo, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div
      className={cn(
        "bg-color-3/20",
        params.locale === "ar" ? cairo.className : inter.className
      )}
    >
      <Navbar />
      <main>{children}</main>
      <Link
        href="https://api.whatsapp.com/send?phone=966531458314&text=السلام%20عليكم،%20حاب%20استفسر%20عن%20التوريد"
        className="fixed md:right-5 md:bottom-5 right-4 bottom-4"
      >
        <Image
          src="/icons/whatsapp.svg"
          alt="whatsapp"
          width={150}
          height={150}
          className="h-14 w-14 md:h-16 md:w-16 p-3 rounded-full bg-green-500 hover:bg-green-600 transition-all cursor-pointer"
        />
      </Link>
      <Footer locale={params.locale} />
    </div>
  );
}
