import Alert from "./Alert";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import useCart from "@/store/cartStore";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function OrderModel({
  isOpen,
  onClose,
  product,
}: DeleteAlertProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string | undefined>();

  const cart = useCart();

  const total = product.price * quantity;

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
      ...product,
      quantity,
      total,
      note,
    });
    onClose();
  };

  return (
    <Alert title={""} isOpen={isOpen} onClose={onClose}>
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
                  <p className="text-muted-foreground mb-2">
                    {product.description}
                  </p>
                  <div className="text-xl border-y border-color-4  w-full md:w-fit flex items-center justify-around px-2">
                    <span>
                      {product.price} <span className="mr-1">ريال</span>
                    </span>
                    <span className="h-3 w-[1px] hidden md:block md:mx-4 bg-color-4" />
                    <span className="text-lg mr-auto">{product.size} سم</span>
                  </div>
                </div>
              </div>

              <div className="my-5 w-40 flex flex-col items-center md:block mx-auto md:mx-0">
                <p className="text-sm text-gray-500 mb-2">الكمية</p>
                <div className="flex justify-between items-center w-40">
                  <Button onClick={handleDecrement} variant="outline">
                    -
                  </Button>
                  <p>{quantity}</p>
                  <Button onClick={handleIncrement} variant="outline">
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
                <div className="flex justify-between border-y border-color-4 mt-2">
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
