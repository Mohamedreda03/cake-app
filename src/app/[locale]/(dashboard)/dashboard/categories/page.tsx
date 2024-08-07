"use client";

import DataTable from "./_components/DataTable";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationButtons from "@/components/pagination-buttons";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Link } from "@/hooks/navigation";
import { Category } from "@prisma/client";
import { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocale, useTranslations } from "next-intl";

interface CategoryData extends Category {
  translation: {
    name: string;
    language: string;
  };
}

export default function Users() {
  const searchParams = useSearchParams();
  const pageSize = searchParams.get("size") || 10;
  const pageNumber = searchParams.get("page") || 1;
  const locale = useLocale();
  const t = useTranslations("Dash_Categories");

  const [search, setSearch] = useState<string>("");

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", pageNumber, pageSize],
    queryFn: async () => {
      return await axios.get(
        "/api/categories?lang=" +
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

  const filterCategories = categories?.data?.data?.filter(
    (item: CategoryData) => item?.translation?.name?.includes(search)
  );

  return (
    <div>
      <div className="px-5 md:px-20 py-10 flex items-center justify-between">
        <h1 className="md:text-3xl text-2xl font-medium border-b-2 border-color-1">
          {t("categories")}
        </h1>
        <div>
          <Link href="/dashboard/categories/new-category">
            <Button
              variant="main"
              className="md:text-lg flex items-center justify-center gap-2"
            >
              {t("create_category")}
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
          placeholder={t("search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        data={search.length > 0 ? filterCategories : categories?.data?.data}
      />
      <PaginationButtons
        currentPage={Number(pageNumber)}
        pageCount={categories?.data?.count}
        url="categories"
        pageSize={Number(pageSize)}
      />
    </div>
  );
}
