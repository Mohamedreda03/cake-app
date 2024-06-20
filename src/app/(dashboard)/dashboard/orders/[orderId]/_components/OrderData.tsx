"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { Order, ProductOrder, SpecialItem } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const inter = Inter({ subsets: ["latin"] });

interface OrderType extends Order {
  products: ProductOrder[];
  special_items: SpecialItem[];
}

export function OrderData({
  order,
}: {
  order: OrderType & { _count: { special_items: number } };
}) {
  const queryClient = useQueryClient();
  const [orderStatus, setOrderStatus] = useState(order.status);

  console.log(order);

  const { mutate } = useMutation({
    mutationFn: async (
      status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"
    ) => {
      await axios.patch(`/api/orders/${order.id}`, {
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
  });

  const handleUpdateOrder = async (
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"
  ) => {
    mutate(status);
    setOrderStatus(status);
  };

  return (
    <div className="pb-16">
      <div className="mb-5">
        <div className="flex items-center gap-6">
          <p>تعديل حالت الطلب</p>
          <div></div>
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
                    order.payment_status === "FAILED",

                  "text-gray-900 bg-slate-200 w-fit px-3 py-1 rounded-full":
                    order.payment_status === "PENDING",
                })}
              >
                {order.payment_status === "PAID" && "تم الدفع"}
                {order.payment_status === "PENDING" && "الدفع عند الاستلام"}
                {order.payment_status === "FAILED" && "فشل الدفع والغي الطلب"}

                {order._count.special_items &&
                  order.payment_status === "PAID" &&
                  order._count.special_items > 0 &&
                  " + طلب خاص"}
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
          <TableRow className={inter.className}>
            <TableCell className="font-medium w-[200px]">payment id</TableCell>
            <TableCell colSpan={4} className="font-medium">
              {order.payment_id}
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
        <TableFooter>
          <TableRow>
            <TableCell>المبلغ الكلي</TableCell>
            <TableCell colSpan={4} className="text-right">
              {order.total} <span className="mr-1">ريال</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="mt-10 max-w-screen-md">
        <h3 className="text-2xl mx-auto w-fit border-b-2 border-color-1 mb-3">
          الطلب
        </h3>
        <Table className="max-w-screen-md border">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-center">
                صورة المنتج
              </TableCell>
              <TableCell className="font-medium text-center">
                اسم المنتج
              </TableCell>
              <TableCell className="font-medium text-center">الكمية</TableCell>
              <TableCell className="font-medium text-center">الحجم</TableCell>
              <TableCell className="font-medium text-center">السعر</TableCell>
              <TableCell className="font-medium text-center">
                الملاحظات
              </TableCell>
            </TableRow>
            {order.products?.map((product: ProductOrder) => (
              <TableRow key={product.id}>
                <TableCell className="text-center">
                  <img
                    src={product.image}
                    alt="product image"
                    className="mx-auto w-[60px] h-[40px] object-cover"
                  />
                </TableCell>
                <TableCell className="text-center">{product.name}</TableCell>
                <TableCell className="text-center">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-center">{product.size} سم</TableCell>
                <TableCell className="text-center">
                  {product.total} ريال
                </TableCell>
                {product.note && (
                  <TableCell className="text-center">{product.note}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {order.special_items.length > 0 && (
        <div>
          <div className="mt-10 max-w-screen-md">
            <h3 className="text-2xl mx-auto w-fit border-b-2 border-color-1 mb-3">
              طلب الخاص
            </h3>
            <Table className="max-w-screen-md border">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-center">
                    الكمية
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    الوصف
                  </TableCell>
                </TableRow>
                {order.special_items.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell className="text-center">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
