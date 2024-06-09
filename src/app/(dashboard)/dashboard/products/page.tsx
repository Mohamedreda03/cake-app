"use client";

import DataTable from "./_components/DataTable";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import PaginationButtons from "@/components/pagination-buttons";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Users() {
  const searchParams = useSearchParams();
  const pageSize = searchParams.get("size") || 10;
  const pageNumber = searchParams.get("page") || 1;

  const [search, setSearch] = useState<string>("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", pageNumber, pageSize],
    queryFn: async () => {
      return await axios.get(
        "/api/products?page=" + pageNumber + "&size=" + pageSize
      );
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const filterProducts = products?.data?.data?.filter((item: any) =>
    item?.name.includes(search)
  );

  return (
    <div>
      <div className="px-5 md:px-20 py-10 flex items-center justify-between">
        <h1 className="text-3xl font-medium border-b-2 border-color-1">
          المنتجات
        </h1>
        <div>
          <Link href="/dashboard/products/new-product">
            <Button
              variant="main"
              className="text-xl flex items-center justify-center gap-2"
            >
              انشاء منتج
              <CirclePlus size={20} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="px-5 md:px-20 pb-3">
        <Label className="text-lg">بحث</Label>
        <Input
          type="text"
          className="max-w-[300px] mt-2"
          placeholder="ابحث عن منتج"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable data={filterProducts} />
      <PaginationButtons
        currentPage={Number(pageNumber)}
        pageCount={products?.data?.count}
        url="users"
        pageSize={Number(pageSize)}
      />
    </div>
  );
}
