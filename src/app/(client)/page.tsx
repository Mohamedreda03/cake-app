import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { db } from "@/lib/db";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "بيلا سويت",
  description:
    "بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.",
};

export const dynamic = "force-dynamic";
export default async function Home() {
  const categories = await db.category.findMany();
  const products = await db.product.findMany({
    include: {
      sizes: true,
    },
  });
  return (
    <div className="max-w-screen-xl mx-auto p-5 md:p-7">
      <Head>
        <meta
          name="description"
          content="بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية."
        />
        <meta property="og:title" content="بيلا سويت" />
        <meta
          property="og:description"
          content="بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية."
        />
        <meta property="og:image" content="/logo.svg" />
        <meta
          name="twitter:card"
          content="الدمّام حي الريان ٢-١١ مساءً ✨للطلب بنفس اليوم (فقط اتصال) 0507177844 ✨لطلب حجوزات مستقبليه: منسقه الطلبات 0502842888 ✨للاقتراحات 0505187012.
"
        />
      </Head>
      <Hero />
      <Products products={products} categories={categories} />
    </div>
  );
}
