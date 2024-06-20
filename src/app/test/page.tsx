"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect } from "react";

export default function Test() {
  const testWebhook = async () => {
    await axios
      .request({
        url: "https://api.moyasar.com/v1/webhooks",
        method: "POST",
        auth: {
          username: process.env.NEXT_PUBLIC_MOYASAR_API_KEY!,
          password: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          http_method: "POST",
          url: process.env.NEXT_PUBLIC_URL,
          shared_secret: "test",
          events: ["payment_paid"],
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    const te = async () => {
      await axios
        .request({
          url: "https://api.moyasar.com/v1/webhooks",
          method: "GET",
          auth: {
            username: process.env.NEXT_PUBLIC_MOYASAR_API_KEY!,
            password: "",
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    };
  }, []);
  return (
    <div>
      <Button onClick={testWebhook}>Test Webhook</Button>
    </div>
  );
}