"use client";

import DataTable from "./_components/DataTable";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import PaginationButtons from "@/components/pagination-buttons";

export default function Orders() {
  const searchParams = useSearchParams();
  const pageSize = searchParams.get("size") || 10;
  const pageNumber = searchParams.get("page") || 1;

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", pageNumber, pageSize],
    queryFn: async () => {
      return await axios.get(
        "/api/orders?page=" + pageNumber + "&size=" + pageSize
      );
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="px-5 md:px-20 py-10 flex items-center justify-between">
        <h1 className="text-3xl font-medium border-b-2 border-color-1">
          الطلبات
        </h1>
      </div>
      <DataTable orders={orders?.data?.data} />
      <PaginationButtons
        currentPage={Number(pageNumber)}
        pageCount={orders?.data?.count}
        url="orders"
        pageSize={Number(pageSize)}
      />
    </div>
  );
}
