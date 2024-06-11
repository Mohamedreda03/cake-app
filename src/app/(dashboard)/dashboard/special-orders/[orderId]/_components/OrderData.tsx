"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Order, ProductOrder, SpecialOrder } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
// import { Inter } from "next/font/google";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// const inter = Inter({ subsets: ["latin"] });

export function OrderData({ order }: { order: SpecialOrder }) {
  const queryClient = useQueryClient();
  const [orderStatus, setOrderStatus] = useState(order.status);

  console.log("order", order);

  const { mutate } = useMutation({
    mutationFn: async (
      status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"
    ) => {
      await axios.patch(`/api/special-orders/${order.id}`, {
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("special");
    },
  });

  const handleUpdateOrder = async (
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"
  ) => {
    mutate(status);
    setOrderStatus(status);
  };

  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center gap-6">
          <p>تعديل حالت الطلب</p>

          <select
            className="border rounded-lg"
            value={orderStatus}
            onChange={(e) => handleUpdateOrder(e.target.value as any)}
          >
            <option value="PENDING">قيد الانتظار</option>
            <option value="PROCESSING">قيد التحضير</option>
            <option value="SHIPPED">جاري التوصيل</option>
            <option value="DELIVERED">تم التوصيل</option>
          </select>
        </div>
      </div>
      <Table className="max-w-screen-md border">
        <TableBody>
          <TableRow>
            <TableCell className="font-medium w-[200px]">
              اسم صاحب الطلب
            </TableCell>
            <TableCell colSpan={4} className="font-medium">
              {order.order_maker_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium w-[200px]">اسم المقهى</TableCell>
            <TableCell colSpan={4} className="font-medium">
              {order.cafe_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium w-[200px]">حالة الدفع</TableCell>
            <TableCell colSpan={4} className="text-center">
              <div
                className={cn({
                  "text-green-500 bg-green-50 w-fit px-2 py-1 rounded-full":
                    order.payment_status === "PAID",
                  "text-red-500 bg-red-50 w-fit px-3 py-1 rounded-full":
                    order.payment_status === "PENDING",
                })}
              >
                {order.payment_status === "PAID"
                  ? "تم الدفع"
                  : "الدفع عند الاستلام"}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium w-[200px]">حالة الطلب</TableCell>
            <TableCell colSpan={4} className="font-medium">
              {orderStatus === "PENDING" && "قيد الانتظار"}
              {orderStatus === "PROCESSING" && "قيد التحضير"}
              {orderStatus === "SHIPPED" && "جاري التوصيل"}
              {orderStatus === "DELIVERED" && "تم التوصيل"}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium w-[200px]">
              العنوان كامل
            </TableCell>
            <TableCell colSpan={4} className="font-medium">
              {order.address}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium w-[200px]">رقم الهاتف</TableCell>
            <TableCell colSpan={4} className="font-medium">
              {order.phone}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium w-[200px]">تاريخ الطلب</TableCell>
            <TableCell colSpan={4} className="font-medium">
              {format(new Date(order.createdAt), "HH:mm a , dd  MMMM  yyyy", {
                locale: ar,
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-10 max-w-screen-md">
        <h3 className="text-2xl mx-auto w-fit border-b-2 border-color-1 mb-3">
          الطلب
        </h3>
        <Table className="max-w-screen-md border">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-[200px]">الكمية</TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.quantity}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium w-[200px]">الوصف</TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.description}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
