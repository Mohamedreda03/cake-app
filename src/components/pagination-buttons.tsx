"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export default function PaginationButtons({
  url,
  pageCount,
  currentPage,
  pageSize,
}: // setPage,
{
  pageCount: number;
  currentPage: number;
  url: string;
  pageSize: string | number;
  // setPage: Dispatch<SetStateAction<number>>;
}) {
  const [page, setPage] = useState(currentPage);
  const size = Number(pageSize);

  const router = useRouter();

  const handleNext = () => {
    setPage((prev) => prev + 1);
    router.push(`/dashboard/${url}?page=${currentPage + 1}&size=${size}`);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
    router.push(`/dashboard/${url}?page=${currentPage - 1}&size=${size}`);
  };

  return (
    <>
      {pageCount > 1 && (
        <div className="flex justify-center flex-row-reverse gap-4  mb-16">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 text-color-3 bg-color-2 rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          {pageCount &&
            Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  router.push(`/dashboard/${url}?page=${i + 1}&size=${size}`);
                }}
                className={cn(
                  `px-4 py-2 text-color-2 border-2 border-color-2/50 rounded-md`,
                  i + 1 === currentPage
                    ? "bg-color-2 text-color-3"
                    : "hover:bg-color-1 hover:text-white"
                )}
              >
                {i + 1}
              </button>
            ))}

          <button
            disabled={currentPage === pageCount}
            onClick={handleNext}
            className="px-4 py-2 text-color-3 bg-color-2 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
