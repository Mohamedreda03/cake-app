import Image from "next/image";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import useCart, { type CartItemType } from "@/store/cartStore";
import { useState } from "react";

const CartItem = ({ item }: { item: CartItemType }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [currentPrice, setCurrentPrice] = useState<number>(item.total);
  const deleteItemData = () => {
    cart.removeItem(item.id);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    setCurrentPrice((prev) => prev + item.price);
    cart.updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setCurrentPrice((prev) => prev - item.price);
      cart.updateItemQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="border border-gray-200 p-5 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={item.image as string}
            alt="image"
            width={100}
            height={100}
            className="rounded-md w-[100px] h-[100px] object-cover"
          />
          <div className="flex flex-col gap-1 mr-5">
            <div className="relative w-fit">
              <div className="z-10 text-2xl mb-2">{item.name}</div>
              <div className="absolute bottom-2 w-full h-4 bg-color-4/40 -z-10"></div>
            </div>
            <div className="flex items-center gap-6 mb-2">
              <p className=" border-b border-color-1">{item.size} سم</p>
              <span className="h-5 w-0.5 bg-color-1" />
              <p className="text-primary text-lg border-b border-color-1">
                {currentPrice} ريال
              </p>
            </div>
            {/* ////////////// */}
            <div className="flex justify-between items-center w-40">
              <Button onClick={handleDecrement} variant="outline">
                -
              </Button>
              <p>{quantity}</p>
              <Button onClick={handleIncrement} variant="outline">
                +
              </Button>
            </div>
            {/* ////////////// */}
          </div>
        </div>
        <div>
          <Button
            onClick={deleteItemData}
            variant="outline"
            className="text-muted-foreground"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
