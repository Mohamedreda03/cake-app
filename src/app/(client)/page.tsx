import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { db } from "@/lib/db";

export default async function Home({}: {}) {
  const categories = await db.category.findMany();
  const products = await db.product.findMany();
  return (
    <div className="max-w-screen-xl mx-auto p-7">
      <Hero />
      <Products products={products} categories={categories} />
    </div>
  );
}
