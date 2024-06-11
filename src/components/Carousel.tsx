"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import ProductCard from "./ProductCard";
// import { featchDataFromApi } from "../utils/api";

import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { Category } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import SpecialOrderModel from "./models/SpecialOrderModel";

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
  return (
    <>
      <SpecialOrderModel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div dir="rtl" className="mt-[50px] md:mt-[80px] mb-[70px]">
        <div className="flex gap-2 overflow-x-scroll scroll_div relative">
          <div>
            <Button onClick={() => setIsOpen(true)} variant="secondary">
              اضافت طلب خاص
              <PlusCircle size={18} className="mr-1" />
            </Button>
          </div>
          <span className="w-[1px] bg-color-1"></span>
          <div>
            <Button
              onClick={() => setCurrentCategory(null)}
              variant={currentCategory === null ? "main" : "secondary"}
            >
              الكل
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setCurrentCategory("best_seller")}
              variant={currentCategory === "best_seller" ? "main" : "secondary"}
            >
              الكثر مبيعا
            </Button>
          </div>
          {data.map((category) => (
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
