import { Product } from "@prisma/client";
import Image from "next/image";
import OrderButton from "./OrderButton";

export default function Card({ product }: { product: Product }) {
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-xl border border-color-3 w-full md:max-w-[300px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
      style={{ wordSpacing: "2px" }}
    >
      <Image
        src={product.image}
        width={200}
        height={200}
        alt="product image"
        className="w-full h-[250px] object-cover"
      />
      <div className="p-5 flex flex-col items-center w-full">
        <div className="relative w-fit">
          <p className="z-10 text-2xl">{product.name}</p>
          <div className="absolute bottom-2 w-full h-2 bg-color-4/50 -z-10"></div>
        </div>

        <p className="text-muted-foreground text-sm text-center line-clamp-1 mb-2">
          {product.description}
        </p>
        <div className="flex items-center gap-3">
          <span className="bg-color-4/70 px-3 py-1.5 text-gray-900 rounded-full">
            {product.price} ريال
          </span>
          <span className="bg-color-4/70 px-3 py-1.5 text-gray-900 rounded-full">
            {product.size} سم
          </span>
        </div>
        <OrderButton product={product} />
      </div>
    </div>
  );
}
