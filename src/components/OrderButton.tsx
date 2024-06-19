"use client";

import { Product, Size } from "@prisma/client";
import { Button } from "./ui/button";
import OrderModel from "./models/OrderModel";
import { useState } from "react";

export default function OrderButton({
  product,
}: {
  product: Product & { sizes: Size[] };
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <OrderModel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
      />
      <Button
        onClick={() => setIsOpen(true)}
        className="mt-3 rounded-full w-full"
        variant="main"
      >
        أضف إلى السلة
      </Button>
    </>
  );
}
