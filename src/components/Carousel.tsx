"use client";

// import "react-multi-carousel/lib/styles.css";

import { PlusCircle } from "lucide-react";
import { Category } from "@prisma/client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Button } from "./ui/button";
import SpecialOrderModel from "./models/SpecialOrderModel";
import { useTranslations } from "next-intl";

const CategoriesMenu = ({
  data,
  setCurrentCategory,
  currentCategory,
}: {
  data: Category[];
  setCurrentCategory: Dispatch<SetStateAction<string | null>>;
  currentCategory: string | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("HomePage");

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <>
      <SpecialOrderModel isOpen={isOpen} onClose={onClose} />
      <div className="mt-[50px] md:mt-[80px] mb-[70px]">
        <div className="flex gap-2 overflow-x-scroll scroll_div relative">
          <div>
            <Button onClick={() => setIsOpen(true)} variant="secondary">
              {t("add_special_order")}
              <PlusCircle size={18} className="mx-1" />
            </Button>
          </div>
          <span className="w-[1px] bg-color-1"></span>
          <div>
            <Button
              onClick={() => setCurrentCategory(null)}
              variant={currentCategory === null ? "main" : "secondary"}
            >
              {t("all_products")}
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setCurrentCategory("best_seller")}
              variant={currentCategory === "best_seller" ? "main" : "secondary"}
            >
              {t("best_selling")}
            </Button>
          </div>
          {data?.map((category) => (
            <div key={category.id}>
              <Button
                key={category.id}
                onClick={() => setCurrentCategory(category.id)}
                variant={currentCategory === category.id ? "main" : "outline"}
              >
                {category.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesMenu;
