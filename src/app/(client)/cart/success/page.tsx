"use client";

import useCart from "@/store/cartStore";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const cart = useCart();
  const searchParams = useSearchParams();
  useEffect(() => {
    const checkStatus = async () => {
      if (searchParams.get("invoice_id")) {
        await axios
          .request({
            url: `https://api.moyasar.com/v1/invoices/${searchParams.get(
              "invoice_id"
            )}`,
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
  }, []);

  return <div>Success</div>;
}
