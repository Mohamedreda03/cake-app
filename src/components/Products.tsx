"use client";

import { Product } from "@prisma/client";
import { useQuery } from "react-query";
import Loading from "./Loading";
import Card from "./Card";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Products() {
  const [isMounted, setIsMounted] = useState(false);
  //   const { data: category, isLoading } = useQuery("products", async () => {
  //     return await axios.get(
  //       `/api/category-products?category=${searchParams.get("category")}`
  //     );
  //   });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  //   if (isLoading) {
  //     return <Loading />;
  //   }

  return (
    <>
      {/* {category?.data?.products?.map((product: Product) => (
        <Card key={product.id} product={product} />
      ))} */}
    </>
  );
}
