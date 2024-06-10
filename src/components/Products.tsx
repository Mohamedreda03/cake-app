"use client";

import { Category, Product } from "@prisma/client";
import Loading from "./Loading";

import { useSearchParams } from "next/navigation";
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
    if (currentCategory) {
      setFilterdProducts(
        products.filter((product) => product.categoryId === currentCategory)
      );
    } else {
      setFilterdProducts(products);
    }
  }, [currentCategory, products]);

  return (
    <>
      <div className="h-[400px]">
        <CategoriesMenu
          data={categories}
          setCurrentCategory={setCurrentCategory}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
        {filterdProducts.map((product: Product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
