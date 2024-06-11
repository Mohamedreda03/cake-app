import useSpecialProduct, { SpecialProductType } from "@/store/specialProduct";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export default function SpecialCartItem({
  item,
}: {
  item: SpecialProductType;
}) {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const specialCart = useSpecialProduct();
  const deleteItemData = (id: number) => {
    specialCart.removeItem(id);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);

    specialCart.updateItemQuantity(item.id!, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);

      specialCart.updateItemQuantity(item.id!, item.quantity - 1);
    }
  };
  return (
    <div className="border p-5 min-h-[150px] relative rounded-lg">
      {/* ////////////// */}
      <div className="flex justify-between items-center w-32 md:w-36">
        <Button onClick={handleDecrement} variant="outline">
          -
        </Button>
        <p>{quantity}</p>
        <Button onClick={handleIncrement} variant="outline">
          +
        </Button>
      </div>
      {/* ////////////// */}
      <Button
        onClick={() => deleteItemData(item.id!)}
        variant="outline"
        className="absolute top-2 left-2"
      >
        <Trash2 size={20} />
      </Button>
      <h1 className="mt-3 border-b border-color-1 w-fit">وصف الطلب</h1>
      <p className="">{item.description}</p>
    </div>
  );
}
