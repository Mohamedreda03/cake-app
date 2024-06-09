import Card from "@/components/Card";
import CategoriesMenu from "@/components/Carousel";
import Products from "@/components/Products";
import { db } from "@/lib/db";

export default async function Home({
  params,
}: {
  params: { categoryId: string };
}) {
  const categories = await db.category.findMany();
  return (
    <div className="max-w-screen-xl mx-auto p-7">
      <div className="h-[400px]" dir="ltr">
        <CategoriesMenu data={categories} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
        <Products />
      </div>
    </div>
  );
}
