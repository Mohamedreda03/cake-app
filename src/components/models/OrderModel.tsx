import Alert from "./Alert";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Product, Size } from "@prisma/client";
import Image from "next/image";
import useCart from "@/store/cartStore";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product & { sizes: Size[] };
}

export default function OrderModel({
  isOpen,
  onClose,
  product,
}: DeleteAlertProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string | undefined>();
  console.log(product.sizes);
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
      name: product.name,
      image: product.image,
      description: product.description,
      price: currentSize?.price!,
    });
    onClose();
  };

  return (
    <Alert
      title={""}
      className="max-w-[600px] w-full md:px-10"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div dir="rtl" className="">
        <div className="flex flex-col">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="md:flex-[1.3]">
              <div className="flex justify-between w-full">
                <div className="flex flex-col items-center mx-auto mt-3 md:block md:mx-0 w-full">
                  <div className="relative w-fit">
                    <div className="z-10 text-5xl md:text-4xl mb-2">
                      {product.name}
                    </div>
                    <div className="absolute bottom-2 w-full h-4 bg-color-4/40 -z-10"></div>
                  </div>
                  <p className="text-muted-foreground mb-2 text-md">
                    {product.description}
                  </p>
                  <div className="text-xl border-y border-color-4  w-full md:w-fit flex items-center justify-around p-2">
                    <span>
                      {currentSize?.price} <span className="mr-1">ريال</span>
                    </span>
                    <span className="h-3 w-[1px] hidden md:block md:mx-4 bg-color-4" />
                    <span className="text-lg mr-auto">
                      {currentSize?.size} سم
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <Select
                  dir="rtl"
                  onValueChange={(value) => {
                    setCurrentSize(
                      product.sizes.find((size) => size.size === value) || null
                    );
                  }}
                  defaultValue={currentSize?.size}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="اختر الحجم" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size.id} value={size.size}>
                        <div>
                          <span>{size.size} سم</span>
                          <span className="mx-3">|</span>
                          <span className="text-muted-foreground text-sm">
                            {size.price} ريال
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-5 mt-3 w-40 flex flex-col items-center md:block mx-auto md:mx-0">
                <p className="text-sm text-gray-500 mb-2">الكمية</p>
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
                  <p>المجموع</p>
                  <p className="text-xl w-fit mr-3">
                    {total} <span className="mr-1">ريال</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Label>اضف ملاحظة</Label>
            <Textarea
              placeholder="اضف ملاحظة على الطلب"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            إلغاء
          </Button>
          <Button onClick={handleAddToCart} variant="main">
            أضف إلى السلة
          </Button>
        </div>
      </div>
    </Alert>
  );
}
