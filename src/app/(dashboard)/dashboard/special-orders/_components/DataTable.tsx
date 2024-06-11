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
import { cn } from "@/lib/utils";
import { Order, User } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function DataTable({ orders }: { orders: Order[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/special-orders/${selectedUser}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      toast.success("تم حذف الطلب بنجاح");
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
        title="حذف الطلب"
        description="هل أنت متأكد من حذف الطلب؟"
      />
      <div className="px-5 py-10 md:px-20">
        <Table dir="rtl" className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg">
                اسم صاحب الطلب
              </TableHead>
              <TableHead className="text-center text-lg">اسم المقهى</TableHead>
              <TableHead className="text-center text-lg">رقم الجوال</TableHead>
              <TableHead className="text-center text-lg">حلات الدفع</TableHead>
              <TableHead className="text-center text-lg">حلات الطلب</TableHead>
              <TableHead className="text-center text-lg">
                المبلغ الكلي
              </TableHead>
              <TableHead className="text-center text-lg"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-center">
                  {order.order_maker_name}
                </TableCell>
                <TableCell className="text-center">{order.cafe_name}</TableCell>
                <TableCell className="text-center">{order.phone}</TableCell>
                <TableCell className="text-center">
                  <div
                    className={cn({
                      "text-green-500 bg-green-50 w-fit px-2 py-1 rounded-full mx-auto":
                        order.payment_status === "PAID",
                      "text-red-500 bg-red-50 w-fit px-3 py-1 rounded-full mx-auto":
                        order.payment_status === "PENDING",
                    })}
                  >
                    {order.payment_status === "PAID"
                      ? "تم الدفع"
                      : "الدفع عند الاستلام"}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {order.status === "PENDING" && "قيد الانتظار"}
                  {order.status === "PROCESSING" && "قيد التحضير"}
                  {order.status === "SHIPPED" && "جاري التوصيل"}
                  {order.status === "DELIVERED" && "تم التوصيل"}
                </TableCell>
                <TableCell className="text-center">
                  {order.total} <span className="mr-1">ريال</span>
                </TableCell>
                <TableCell className="text-center flex gap-3 items-center justify-center">
                  <Link href={`/dashboard/special-orders/${order.id}`}>
                    <Button className="text-sm" variant="secondary">
                      تفاصيل
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSelectedUser(order.id);
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
