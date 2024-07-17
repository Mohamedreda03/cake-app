"use client";

import Alert from "./Alert";
import { Button } from "../ui/button";
import { useState } from "react";
import { Product, ProductTranslation, Size } from "@prisma/client";
import Image from "next/image";
import useCart from "@/store/cartStore";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import "./model.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product & { sizes: Size[]; translation: ProductTranslation[] };
}

export default function OrderModel({
  isOpen,
  onClose,
  product,
}: DeleteAlertProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string | undefined>();
  const t = useTranslations("More");
  const locale = useLocale();

  const [currentSize, setCurrentSize] = useState<Size | null>(
    product?.sizes.length > 0 ? product.sizes[0] : null
  );

  const cart = useCart();

  const total = currentSize?.price! * quantity;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    cart.addItem({
      size: currentSize?.size!,
      special_id: `${product.id}-${currentSize?.id}`,
      quantity,
      total,
      note: note || "",
      name_ar: product.translation[0].name,
      name_en: product.translation[1].name,
      image: product.image,
      description_ar: product.translation[0].description,
      description_en: product.translation[1].description,
      price: currentSize?.price!,
    });
    onClose();
  };

  return (
    <Alert
      title={""}
      className="max-w-[600px] w-full md:px-10 overflow-y-scroll h-full md:h-auto"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div dir={locale === "ar" ? "rtl" : "ltr"} className="">
        <div className="flex flex-col">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="md:flex-[1.3]">
              <div className="flex justify-between w-full">
                <div className="flex flex-col items-center mx-auto mt-3 md:block md:mx-0 w-full">
                  <div className="relative w-fit">
                    <div className="z-10 text-5xl md:text-4xl mb-2">
                      {product.translation[0].name}
                    </div>
                    <div className="absolute bottom-2 w-full h-4 bg-color-4/40 -z-10"></div>
                  </div>
                  <p className="text-muted-foreground mb-2 text-md">
                    {product.translation[0].description}
                  </p>
                  <div className="text-xl border-y border-color-4  w-full md:w-fit flex items-center justify-around p-2">
                    <span>
                      {currentSize?.price}{" "}
                      <span className="mr-1 text-muted-foreground text-sm">
                        {t("curancy")}
                      </span>
                    </span>
                    <span className="h-3 w-[1px] hidden md:block md:mx-4 bg-color-4" />
                    <span className="text-lg mr-auto">
                      {currentSize?.size}{" "}
                      <span className="text-muted-foreground text-sm">
                        {t("size")}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <Select
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  onValueChange={(value) => {
                    setCurrentSize(
                      product.sizes.find((size) => size.size === value) || null
                    );
                  }}
                  defaultValue={currentSize?.size}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder={t("select_size")} />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size.id} value={size.size}>
                        <div>
                          <span className="text-lg">
                            {size.size}{" "}
                            <span className="text-muted-foreground text-sm">
                              {t("size")}
                            </span>
                          </span>
                          <span className="mx-3">|</span>
                          <span className="text-lg">
                            {size.price}{" "}
                            <span className="text-muted-foreground text-sm">
                              {t("curancy")}
                            </span>
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-5 mt-3 w-40 flex flex-col items-center md:block mx-auto md:mx-0">
                <p className="text-sm text-gray-500 mb-2">{t("quantity")}</p>
                <div className="flex justify-between items-center w-40">
                  <Button
                    onClick={handleDecrement}
                    size="icon"
                    variant="outline"
                  >
                    -
                  </Button>
                  <p className="text-2xl">{quantity}</p>
                  <Button
                    onClick={handleIncrement}
                    size="icon"
                    variant="outline"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={product.image}
                width={200}
                height={200}
                alt="product image"
                className="rounded-lg w-full h-[300px] md:w-[200px] md:h-[150px] object-cover"
              />
              <div>
                <div className="flex justify-between border-y border-color-4 mt-5 p-2 text-lg">
                  <p>{t("total")}</p>
                  <p className="text-xl w-fit mr-3">
                    {total}{" "}
                    <span className="mr-1 text-sm text-muted-foreground">
                      {t("curancy")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Label>{t("add_note")}</Label>
            <Textarea
              className="mt-2"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            {t("cancel")}
          </Button>
          <Button onClick={handleAddToCart} variant="main">
            {t("add_to_cart")}
          </Button>
        </div>
      </div>
    </Alert>
  );
}
