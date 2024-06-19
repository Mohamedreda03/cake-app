import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { db } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billa Sweet",
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
      <Hero />
      <Products products={products} categories={categories} />
    </div>
  );
}
