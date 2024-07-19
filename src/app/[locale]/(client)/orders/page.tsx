import { auth } from "@/auth";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { db } from "@/lib/db";
import { ProductOrder } from "@prisma/client";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Orders({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("Order_Page");

  const session = await auth();

  if (!session?.user) {
    return {
      redirect: {
        destination: `/${params.locale}/login`,
        permanent: false,
      },
    };
  }

  const userOrders = await db.order.findMany({
    where: {
      userId: session?.user.id,
      status: {
        not: "FAILED",
      },
    },
    include: {
      special_items: true,
      products: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-screen-xl mx-auto p-7">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl border-b-2 border-color-1">{t("orders")}</h1>
      </div>
      <div className="max-w-screen-xl mx-auto p-7 min-h-[450px]">
        {userOrders.map((order) => (
          <div key={order.id}>
            <div className="border bg-color-3/10 p-5">
              <div className="mt-3 max-w-screen-xl">
                <h3 className="text-2xl mx-auto w-fit border-b-2 border-color-1 mb-3">
                  {t("order")}
                </h3>
                <div className="my-5 flex flex-col gap-3">
                  <p>
                    {t("order_id")}: {order.id}
                  </p>
                  <p>
                    {t("payment_status")}:{" "}
                    {order.payment_status === "PENDING" &&
                      t("paiement_when_recieving")}
                    {order.payment_status === "PAID" && t("payment_completed")}
                  </p>
                  <p>
                    {t("order_date")}:{" "}
                    {format(
                      new Date(order.createdAt),
                      "hh:mm a, dd MMMM yyyy",
                      {
                        locale: params.locale === "ar" ? ar : enUS,
                      }
                    )}
                  </p>
                </div>
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
                          <Image
                            src={product.image}
                            height={40}
                            width={60}
                            alt="product image"
                            className="mx-auto object-cover"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          {product.name_ar}
                        </TableCell>
                        <TableCell className="text-center">
                          {product.name_en}
                        </TableCell>
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
                          <TableCell className="text-center">
                            {product.note}
                          </TableCell>
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
            <div className="h-0.5 w-full bg-slate-200 my-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
