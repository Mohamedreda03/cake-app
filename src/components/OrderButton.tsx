"use client";

import { Product, ProductTranslation, Size } from "@prisma/client";
import { Button } from "./ui/button";
import OrderModel from "./models/OrderModel";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function OrderButton({
  product,
}: {
  product: Product & { sizes: Size[]; translation: ProductTranslation[] };
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations("More");

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
        {t("add_to_cart")}
      </Button>
    </>
  );
}
