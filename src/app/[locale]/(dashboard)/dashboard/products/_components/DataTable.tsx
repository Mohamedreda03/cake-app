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
import { Product, ProductTranslation } from "@prisma/client";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

interface ProductData extends Product {
  translation: ProductTranslation[];
}

export default function DataTable({ data }: { data: ProductData[] }) {
  const t = useTranslations("Dash_Products");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/products/${selectedProduct}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success(t("product_deleted_success"));
      setIsOpen(false);
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
        title={t("delete_product")}
        description={t("are_you_sure")}
      />
      <div className="px-5 pb-5 md:px-20">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg">
                {t("product_photo")}
              </TableHead>
              <TableHead className="text-center text-lg">
                {t("product_name")}
              </TableHead>

              <TableHead className="text-center text-lg"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Image
                    src={item.image}
                    width={50}
                    height={50}
                    alt="product image"
                    className="mx-auto w-[60px] h-[40px] object-cover"
                  />
                </TableCell>
                <TableCell className="text-center">
                  {item.translation[0]?.name}
                </TableCell>

                <TableCell className="text-center flex gap-3 items-center justify-center">
                  <Link href={`/dashboard/products/${item.id}`}>
                    <Button className="text-sm" variant="secondary">
                      {t("edit")}
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSelectedProduct(item.id);
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
