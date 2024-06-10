"use client";

import useCart from "@/store/cartStore";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Success() {
  const cart = useCart();
  useEffect(() => {
    const checkStatus = async () => {
      await axios
        .request({
          url: "https://api.moyasar.com/v1/payments",
          method: "GET",
          auth: {
            username: process.env.NEXT_PUBLIC_MOYASAR_API_KEY!,
            password: "",
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          window.localStorage.setItem(
            "payment",
            JSON.stringify(response.data.id)
          );
          window.location.href = response.data.source.transaction_url;
        })
        .catch((error) => {
          toast.error("فشلت عملية الدفع");
          console.log(error);
        });
    };
    checkStatus();
  }, []);
  return <div>Success</div>;
}
