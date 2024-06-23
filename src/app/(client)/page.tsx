import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { db } from "@/lib/db";

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
