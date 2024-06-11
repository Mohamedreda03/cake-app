"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/store/cartStore";
import useSpecialProduct from "@/store/specialProduct";
import axios from "axios";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

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
              window.localStorage.removeItem("payment");
              cart.clearCart();
              specialCart.clearCart();
              await axios
                .patch(`/api/orders/${res.data.metadata.order_id}`, {
                  payment_status: "PAID",
                })
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
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
        <h1 className="text-3xl mt-4">تمت عملية الدفع بنجاح</h1>
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
