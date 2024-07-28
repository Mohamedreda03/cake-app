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
import { Order, SpecialItem } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/hooks/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

interface OrderType extends Order {
  _count: {
    special_items: number;
  };
}

export default function DataTable({ orders }: { orders: OrderType[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const session = useSession();

  const queryClient = useQueryClient();
  const t = useTranslations("Order_Page");
  const locale = useLocale();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/orders/${selectedUser}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      toast.success(t("order_deleted_success"));
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
        title={t("delete_order")}
        description={t("delete_order_confirm")}
      />
      <div className="px-5 py-10 md:px-20">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg">
                {t("order_maker")}
              </TableHead>
              <TableHead className="text-center text-lg">
                {t("cafe_name")}
              </TableHead>
              {(session.data?.user.role === "ADMIN" ||
                session.data?.user.role === "ACCOUNTANT") && (
                <>
                  <TableHead className="text-center text-lg">
                    {t("phone_number")}
                  </TableHead>
                  <TableHead className="text-center text-lg">
                    {t("payment_status")}
                  </TableHead>
                  <TableHead className="text-center text-lg">
                    {t("total_amount")}
                  </TableHead>
                </>
              )}

              <TableHead className="text-center text-lg">
                {t("order_status")}
              </TableHead>
              <TableHead className="text-center text-lg">
                {t("order_date")}
              </TableHead>
              <TableHead className="text-center text-lg">
                {t("order_receipt_date")}
              </TableHead>

              <TableHead className="text-center text-lg"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-center">
                    {order.order_maker_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.cafe_name}
                  </TableCell>
                  {(session.data?.user.role === "ADMIN" ||
                    session.data?.user.role === "ACCOUNTANT") && (
                    <>
                      <TableCell className="text-center">
                        {order.phone}
                      </TableCell>
                      <TableCell className="text-center">
                        <div
                          className={cn({
                            "text-green-500 bg-green-50 w-fit px-2 py-1 rounded-full mx-auto":
                              order.payment_status === "PAID",
                            "text-red-500 bg-red-50 w-fit px-3 py-1 rounded-full mx-auto":
                              order.payment_status === "FAILED",

                            "text-gray-900 bg-slate-200 w-fit px-3 py-1 rounded-full mx-auto":
                              order.payment_status === "PENDING",
                          })}
                        >
                          {order.payment_status === "PAID" &&
                            t("payment_completed")}
                          {order.payment_status === "PENDING" &&
                            t("paiement_when_recieving")}
                          {order.payment_status === "FAILED" &&
                            t("payment_failed")}
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        {order.total}{" "}
                        <span className="mr-1">{t("curancy")}</span>
                      </TableCell>
                    </>
                  )}
                  <TableCell className="text-center">
                    {order.status === "PENDING" && t("pending")}
                    {order.status === "PROCESSING" && t("in_preparation")}
                    {order.status === "SHIPPED" && t("on_the_way")}
                    {order.status === "DELIVERED" && t("delivered")}
                  </TableCell>
                  <TableCell className="text-center">
                    {format(
                      new Date(order.createdAt),
                      "hh:mm a, dd MMMM yyyy",
                      {
                        locale: locale === "ar" ? ar : enUS,
                      }
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    {format(
                      new Date(order.order_receipt_date),
                      "hh:mm a, dd MMMM yyyy",
                      {
                        locale: locale === "ar" ? ar : enUS,
                      }
                    )}
                  </TableCell>
                  <TableCell className="text-center flex gap-3 items-center justify-center">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button className="text-sm" variant="secondary">
                        {t("details")}
                      </Button>
                    </Link>
                    {session.data?.user.role === "ADMIN" && (
                      <Button
                        onClick={() => {
                          setSelectedUser(order.id);
                          setIsOpen(true);
                        }}
                        className="text-sm"
                        variant="destructive"
                      >
                        {t("delete")}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
