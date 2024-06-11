import { db } from "@/lib/db";
import Loading from "@/components/Loading";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderData } from "./_components/OrderData";

export const dynamic = "force-dynamic";
export default async function UserDetails({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await db.order.findFirst({
    where: {
      id: params.orderId,
    },

    include: {
      products: true,
      special_items: true,
    },
  });

  if (!order) {
    return <Loading />;
  }

  return (
    <div>
      <Link
        href="/dashboard/orders"
        className="px-5 md:px-20 py-5 flex items-center gap-3"
      >
        <Button
          variant="secondary"
          className=" flex items-center gap-3"
          size="sm"
        >
          <MoveRight size={18} />
          الرجوع للخلف
        </Button>
      </Link>
      <div>
        <div className="px-5 md:px-20 py-5">
          <h1 className="text-3xl font-medium border-b-2 border-color-1 w-fit mb-10">
            تفاصيل الطلب
          </h1>
          <OrderData order={order} />
        </div>
      </div>
    </div>
  );
}
