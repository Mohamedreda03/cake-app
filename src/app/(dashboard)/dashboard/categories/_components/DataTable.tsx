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
import { Category, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

interface TableProps extends Category {
  _count: {
    product: number;
  };
}

export default function DataTable({ data }: { data: TableProps[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/categories/${selectedCategory}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success("تم حذف الفئه بنجاح");
    },
    onError: () => {
      toast.error("لا يمكن حذف الفئه لانها تحتوي علي منتجات");
    },
  });

  const handleDelete = async () => {
    mutate();

    setIsOpen(false);
  };

  return (
    <>
      <DeleteModel
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={handleDelete}
        title="حذف الفئه"
        description="هل أنت متأكد من حذف الفئه؟"
      />
      <div className="px-5 pb-10 md:px-20">
        <Table dir="rtl" className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg">صورة الفئة</TableHead>
              <TableHead className="text-center text-lg">اسم الفئه</TableHead>
              <TableHead className="text-center text-lg">
                عدد المنتجات في الفئه
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
                <TableCell className="font-medium text-center">
                  {item.name}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {item?._count?.product}
                </TableCell>

                <TableCell className="text-center flex gap-3 items-center justify-center">
                  <Link href={`/dashboard/categories/${item.id}`}>
                    <Button className="text-sm" variant="secondary">
                      تعديل
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
                    حذف
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
