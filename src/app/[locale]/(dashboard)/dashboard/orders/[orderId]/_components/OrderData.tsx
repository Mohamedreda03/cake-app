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
import { ar, enUS } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("Order_Page");
  const queryClient = useQueryClient();
  const [orderStatus, setOrderStatus] = useState(order.status);
  const locale = useLocale();
  const session = useSession();

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
          <p>{t("edit_order_status")}</p>
          <div></div>
          <select
            className="border rounded-lg px-4"
            value={orderStatus}
            onChange={(e) => handleUpdateOrder(e.target.value as any)}
          >
            <option value="PENDING">{t("pending")}</option>
            <option value="PROCESSING">{t("in_preparation")}</option>
            <option value="SHIPPED">{t("on_the_way")}</option>
            <option value="DELIVERED">{t("delivered")}</option>
          </select>
        </div>
      </div>
      {(session.data?.user.role === "ADMIN" ||
        session.data?.user.role === "ACCOUNTANT") && (
        <Table className="max-w-screen-xl border">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("order_maker")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.order_maker_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("cafe_name")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.cafe_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("payment_status")}
              </TableCell>
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
                  {order.payment_status === "PAID" && t("payment_completed")}
                  {order.payment_status === "PENDING" &&
                    t("paiement_when_recieving")}
                  {order.payment_status === "FAILED" && t("payment_failed")}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("order_status")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {orderStatus === "PENDING" && t("pending")}
                {orderStatus === "PROCESSING" && t("in_preparation")}
                {orderStatus === "SHIPPED" && t("on_the_way")}
                {orderStatus === "DELIVERED" && t("delivered")}
              </TableCell>
            </TableRow>
            <TableRow className={inter.className}>
              <TableCell className="font-medium w-[200px]">
                payment id
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.payment_id}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("full_address")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.address}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("phone_number")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.phone}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("order_date")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {format(new Date(order.createdAt), "hh:mm a, dd MMMM yyyy", {
                  locale: locale === "ar" ? ar : enUS,
                })}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>{t("total_price")}</TableCell>
              <TableCell colSpan={4}>
                {order.total} <span className="mr-1">{t("curancy")}</span>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
      {session.data?.user.role === "CHEF" && (
        <Table className="max-w-screen-xl border">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("order_maker")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.order_maker_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("cafe_name")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.cafe_name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("order_status")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {orderStatus === "PENDING" && t("pending")}
                {orderStatus === "PROCESSING" && t("in_preparation")}
                {orderStatus === "SHIPPED" && t("on_the_way")}
                {orderStatus === "DELIVERED" && t("delivered")}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("full_address")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {order.address}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium w-[200px]">
                {t("order_date")}
              </TableCell>
              <TableCell colSpan={4} className="font-medium">
                {format(new Date(order.createdAt), "hh:mm a, dd MMMM yyyy", {
                  locale: locale === "ar" ? ar : enUS,
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      <div className="mt-10 max-w-screen-xl">
        <h3 className="text-2xl mx-auto w-fit border-b-2 border-color-1 mb-3">
          {t("order")}
        </h3>
        <Table className="max-w-screen-xl border">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-center">
                {t("product_image")}
              </TableCell>
              <TableCell className="font-medium text-center">
                {t("product_name_ar")}
              </TableCell>
              <TableCell className="font-medium text-center">
                {t("product_name_en")}
              </TableCell>
              <TableCell className="font-medium text-center">
                {t("product_quantity")}
              </TableCell>
              <TableCell className="font-medium text-center">
                {t("product_size")}
              </TableCell>
              <TableCell className="font-medium text-center">
                {t("product_price")}
              </TableCell>
              <TableCell className="font-medium text-center">
                {t("note")}
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
                <TableCell className="text-center">{product.name_ar}</TableCell>
                <TableCell className="text-center">{product.name_en}</TableCell>
                <TableCell className="text-center">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-center">
                  {product.size} {t("cm")}
                </TableCell>
                <TableCell className="text-center">
                  {product.total} {t("curancy")}
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
          <div className="mt-10 max-w-screen-xl">
            <h3 className="text-2xl mx-auto w-fit border-b-2 border-color-1 mb-3">
              {t("special_order")}
            </h3>
            <Table className="max-w-screen-xl border">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-center">
                    {t("product_quantity")}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {t("order_description")}
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
