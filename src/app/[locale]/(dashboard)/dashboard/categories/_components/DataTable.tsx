"use client";

import DeleteModel from "@/components/models/DeleteModel";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@prisma/client";
import axios from "axios";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

interface TableProps extends Category {
  _count: {
    products: number;
  };
  translation: {
    name: string;
    language: string;
  }[];
}

export default function DataTable({ data }: { data: TableProps[] }) {
  const t = useTranslations("Dash_Categories");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const queryClient = useQueryClient();

  console.log(data);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/categories/${selectedCategory}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success(t("category_deleted_success"));
      setIsOpen(false);
    },
    onError: () => {
      toast.error(t("cannot_delete_category"));
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <>
      <DeleteModel
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={handleDelete}
        title={t("delete_category")}
        description={t("delete_category_confirm")}
      />
      <div className="px-5 pb-10 md:px-20">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">
                {t("category_name")}
              </TableHead>
              <TableHead className="text-center">
                {t("number_of_products")}
              </TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-center">
                  {item.translation[0].name}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {item?._count?.products}
                </TableCell>

                <TableCell className="text-center flex gap-3 items-center justify-center">
                  <Link href={`/dashboard/categories/${item.id}`}>
                    <Button className="text-sm" variant="secondary">
                      {t("edit")}
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSelectedCategory(item.id);
                      setIsOpen(true);
                    }}
                    className="text-sm"
                    variant="destructive"
                  >
                    {t("delete")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
