"use client";

import useCart from "@/store/cartStore";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Success() {
  const cart = useCart();
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
              await axios.post("/api/orders", {
                payment_status: "PAID",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    };
    checkStatus();
  }, [invoiceId]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>Payment Success</h1>
        <p>Thank you for your payment</p>
      </div>
    </Suspense>
  );
}
