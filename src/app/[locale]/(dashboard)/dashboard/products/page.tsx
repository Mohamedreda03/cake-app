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
import { Link } from "@/hooks/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function Users() {
  const t = useTranslations("Dash_Products");
  const searchParams = useSearchParams();
  const pageSize = searchParams.get("size") || 10;
  const pageNumber = searchParams.get("page") || 1;
  const locale = useLocale();

  const [search, setSearch] = useState<string>("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", pageNumber, pageSize],
    queryFn: async () => {
      return await axios.get(
        "/api/products?lang=" +
          locale +
          "&page=" +
          pageNumber +
          "&size=" +
          pageSize
      );
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const filterProducts = products?.data?.data?.filter((item: any) =>
    item?.translation[0]?.name?.includes(search)
  );

  return (
    <div>
      <div className="px-5 md:px-20 py-10 flex items-center justify-between">
        <h1 className="text-3xl font-medium border-b-2 border-color-1">
          {t("products")}
        </h1>
        <div>
          <Link href="/dashboard/products/new-product">
            <Button
              variant="main"
              className="text-lg flex items-center justify-center gap-2"
            >
              {t("add_product")}
              <CirclePlus size={20} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="px-5 md:px-20 pb-3">
        <Label className="text-lg">{t("search")}</Label>
        <Input
          type="text"
          className="max-w-[300px] mt-2"
          placeholder={t("search_for")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        data={search.length > 0 ? filterProducts : products?.data?.data}
      />
      <PaginationButtons
        currentPage={Number(pageNumber)}
        pageCount={products?.data?.count}
        url="users"
        pageSize={Number(pageSize)}
      />
    </div>
  );
}
