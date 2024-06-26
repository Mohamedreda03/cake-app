import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { db } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Bella Sweet",
    template: "%s - Bella Sweet",
  },
  description:
    "بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.",
  twitter: {
    card: "summary_large_image",
    site: "@billa_sweet_",
    description:
      "الدمّام حي الريان ٢-١١ مساءً ✨للطلب بنفس اليوم (فقط اتصال) 0507177844 ✨لطلب حجوزات مستقبليه: منسقه الطلبات 0502842888 ✨للاقتراحات 0505187012.",
  },
};

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto p-5 md:p-7">
      <Hero />
      <Products />
    </div>
  );
}
