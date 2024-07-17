import { Product, ProductTranslation, Size } from "@prisma/client";
import Image from "next/image";
import OrderButton from "./OrderButton";
import { memo } from "react";
import { useLocale } from "next-intl";

function Card({
  product,
}: {
  product: Product & { sizes: Size[]; translation: ProductTranslation[] };
}) {
  const locale = useLocale();
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-xl border border-color-3 w-full md:max-w-[300px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
      style={{ wordSpacing: "2px" }}
    >
      <Image
        src={product.image}
        width={200}
        height={200}
        alt={
          locale === "ar"
            ? product.translation[0].name
            : product.translation[1].name
        }
        className="w-full h-[250px] object-cover"
      />
      <div className="p-5 flex flex-col items-center w-full">
        <div className="relative w-fit">
          <p className="z-10 text-2xl">
            {locale === "ar"
              ? product.translation[0].name
              : product.translation[1].name}
          </p>
          <div className="absolute bottom-2 w-full h-2 bg-color-4/50 -z-10"></div>
        </div>

        <p className="text-muted-foreground text-sm text-center line-clamp-1 mb-2">
          {locale === "ar"
            ? product.translation[0].description
            : product.translation[1].description}
        </p>
        <div className="flex items-center gap-3"></div>
        <OrderButton product={product} />
      </div>
    </div>
  );
}

export default memo(Card);
