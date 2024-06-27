"use client";

import { Category, Product, Size } from "@prisma/client";

import { useEffect, useState } from "react";
import Card from "./Card";
import CategoriesMenu from "./Carousel";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";

type ProductWithSize = Product & { sizes: Size[] };

export default function Products() {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [filterdProducts, setFilterdProducts] = useState<ProductWithSize[]>([]);

  const { data, isLoading } = useQuery("products", async () => {
    const res = await axios.get("/api/menu");
    return res.data;
  });

  useEffect(() => {
    if (currentCategory && currentCategory !== "best_seller") {
      setFilterdProducts(
        data?.products.filter(
          (product: any) => product.categoryId === currentCategory
        )
      );
    } else if (currentCategory === "best_seller") {
      setFilterdProducts(
        data?.products.filter((product: any) => product.best_seller === true)
      );
    } else {
      setFilterdProducts(data?.products);
    }
  }, [currentCategory, data?.products]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="mb-4">
        <CategoriesMenu
          data={data?.categories}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
      </div>

      {filterdProducts?.length === 0 && (
        <div className="flex justify-center items-center h-[90vh]">
          <h1 className="text-4xl">لا يوجد منتجات</h1>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-5">
        {filterdProducts?.map((product: ProductWithSize) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
