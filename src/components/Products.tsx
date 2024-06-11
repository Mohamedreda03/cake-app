"use client";

import { Category, Product } from "@prisma/client";

import { useEffect, useState } from "react";
import Card from "./Card";
import CategoriesMenu from "./Carousel";

export default function Products({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [filterdProducts, setFilterdProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (currentCategory && currentCategory !== "best_seller") {
      setFilterdProducts(
        products.filter((product) => product.categoryId === currentCategory)
      );
    } else if (currentCategory === "best_seller") {
      setFilterdProducts(
        products.filter((product) => product.best_seller === true)
      );
    } else {
      setFilterdProducts(products);
    }
  }, [currentCategory, products]);

  return (
    <>
      <div className="mb-4">
        <CategoriesMenu
          data={categories}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
      </div>

      {filterdProducts.length === 0 && (
        <div className="flex justify-center items-center h-[90vh]">
          <h1 className="text-4xl">لا يوجد منتجات</h1>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-5">
        {filterdProducts.map((product: Product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
