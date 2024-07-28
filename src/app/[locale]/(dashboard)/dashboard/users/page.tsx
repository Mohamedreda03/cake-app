"use client";

import DataTable from "./_components/DataTable";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import PaginationButtons from "@/components/pagination-buttons";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function Users() {
  const searchParams = useSearchParams();
  const pageSize = searchParams.get("size") || 10;
  const pageNumber = searchParams.get("page") || 1;
  const t = useTranslations("User_Page");

  const [search, setSearch] = useState<string>("");

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", pageNumber, pageSize],
    queryFn: async () => {
      return await axios.get(
        "/api/users?page=" + pageNumber + "&size=" + pageSize
      );
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const filterUsers = users?.data?.data?.filter((item: any) =>
    item?.name?.includes(search)
  );

  return (
    <div>
      <div className="px-5 md:px-20 py-10 flex items-center justify-between">
        <h1 className="text-3xl font-medium border-b-2 border-color-1">
          {t("users")}
        </h1>
        <div></div>
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
      <DataTable users={filterUsers} />
      <PaginationButtons
        currentPage={Number(pageNumber)}
        pageCount={users?.data?.count}
        url="users"
        pageSize={Number(pageSize)}
      />
    </div>
  );
}
