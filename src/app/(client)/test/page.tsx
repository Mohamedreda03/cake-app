"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";

export default function TestPage() {
  const handleClick = async () => {
    const res = await axios
      .request({
        url: "https://api.moyasar.com/v1/payments",
        method: "POST",
        auth: {
          username: process.env.NEXT_PUBLIC_MOYASAR_API_KEY!,
          password: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          callback_url: process.env.NEXT_PUBLIC_URL + "/success",
          publishable_api_key: process.env.NEXT_PUBLIC_MOYASAR_API_KEY!,
          amount: 100 * 100,
          currency: "SAR",
          description: "Test payment",
          source: {
            type: "creditcard",
            number: "5421080101000000",
            cvc: "123",
            month: "01",
            year: "25",
            name: "John Doe",
          },
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button onClick={handleClick}>Checkout</Button>
    </div>
  );
}
