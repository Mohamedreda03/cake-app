import { db } from "@/lib/db";
import Products from "@/components/Products";


export const metadata = {
  title: "Billa Sweet",
  description:
    "بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.",
};

export const dynamic = "force-dynamic";
export default async function Menu() {
  const categories = await db.category.findMany();

  const products = await db.product.findMany();
  return (
    <div className="max-w-screen-xl mx-auto p-7">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl border-b-2 border-color-1">الفئات</h1>
      </div>
      {/* <div className="">
        {categories.map((category) => (
          <div key={category.id} className="mt-10">
            <h2 className="text-5xl border-b-2 border-color-3 text-center">
              <div className="relative w-fit mx-auto">
                {category.name}
                <div className="absolute bottom-3 w-full h-3 bg-color-4/50 -z-10"></div>
              </div>
            </h2>
            <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7">
              {category.products.map((product) => (
                <div key={product.id} className="min-h-56">
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> */}
      <Products categories={categories} products={products} />
    </div>
  );
}
