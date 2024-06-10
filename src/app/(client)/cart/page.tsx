"use client";

import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useCart, { CartItemType } from "@/store/cartStore";
import { LoaderCircle } from "lucide-react";

export default function Cart() {
  const cart = useCart();

  const total = cart.items.reduce((acc, item) => acc + item.total, 0);

  const isPending = false;

  return (
    <div className="py-8 px-7 max-w-screen-xl mx-auto flex flex-col gap-6 min-h-[600px]">
      <h1 className="text-center text-5xl font-medium text-primary border-b-2 border-color-1 w-fit">
        السلة
      </h1>
      {cart.items.length < 1 ? (
        <div className="text-center text-lg text-muted-foreground">
          السلة فارغة
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-3 w-full flex-[1.2]">
            {cart.items.map((data: CartItemType) => (
              <CartItem key={data.id} item={data} />
            ))}
          </div>
          <div className="w-full flex-[0.8]">
            <Card className="flex flex-col gap-4 p-6">
              <div>
                <h2 className="text-2xl font-medium">ملخص الطلب</h2>
                <p className="text-muted-foreground mb-4">
                  إجمالي سلة التسوق الخاصة بك
                </p>
              </div>

              <div className="flex items-center justify-between text-xl font-medium">
                <span>المبلغ الكلي</span>
                <span className="border-b-2 text-2xl border-color-1">
                  {total} ريال
                </span>
              </div>
              <Button
                variant="main"
                //   onClick={handleCheckout}
                className="rounded-full w-full"
              >
                <LoaderCircle
                  className={`w-5 h-5 animate-spin mr-2 ${
                    isPending ? "block" : "hidden"
                  }`}
                />
                اكمال الطلب
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
