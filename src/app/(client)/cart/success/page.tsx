"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import useCart from "@/store/cartStore";
import useSpecialProduct from "@/store/specialProduct";
import axios from "axios";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useTransition } from "react";
import toast from "react-hot-toast";

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}

const SuccessPage = () => {
  const cart = useCart();
  const specialCart = useSpecialProduct();
  const invoiceId = useSearchParams().get("invoice_id");

  useEffect(() => {
    const checkStatus = async () => {
      if (invoiceId) {
        await axios
          .request({
            url: `https://api.moyasar.com/v1/invoices/${invoiceId}`,
            method: "GET",
            auth: {
              username: process.env.NEXT_PUBLIC_MOYASAR_API_KEY!,
              password: "",
            },
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(async (res) => {
            if (res.data.status === "paid") {
              await axios
                .post("/api/orders", {
                  cafe_name: res.data.metadata.cafe_name,
                  order_maker_name: res.data.metadata.order_maker_name,
                  address: res.data.metadata.address,
                  phone: res.data.metadata.phone,
                  total: res.data.metadata.total,
                  items: res.data.metadata.items,
                  special_items: res.data.metadata.special_items,
                  status: "PENDING",
                  payment_status: "PAID",
                  payment_id: res.data.id,
                })
                .then((resOrd) => {
                  cart.clearCart();
                  specialCart.clearCart();
                  toast.success("تم ارسال الطلب بنجاح");
                });
            }
          })
          .catch((err) => console.log(err));
      }
    };
    checkStatus();
  }, [invoiceId]);

  return (
    <div className="max-w-screen-xl mx-auto p-7 flex items-center justify-center flex-col">
      <div className="h-[calc(73vh-5px)] flex items-center flex-col">
        <CheckCircle size={100} className="text-green-500 mt-7" />
        <h1 className="text-3xl mt-4">تمت ارسال الطلب بنجاح</h1>
        <Link href="/" className="mt-4">
          <Button variant="outline">
            <p className="text-blue-500">العودة للرئيسية</p>
            <ArrowLeft size={15} className="text-blue-500 mr-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
