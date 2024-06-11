"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import ProductCard from "./ProductCard";
// import { featchDataFromApi } from "../utils/api";

import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { Category } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const CategoriesMenu = ({
  data,
  setCurrentCategory,
  currentCategory,
}: {
  data: Category[];
  setCurrentCategory: Dispatch<SetStateAction<string | null>>;
  currentCategory: string | null;
}) => {
  const responsive = {
    tablet: {
      breakpoint: { max: 4000, min: 900 },
      items: 4,
    },
    tablet1: {
      breakpoint: { max: 900, min: 630 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 630, min: 500 },
      items: 3,
    },
    mobile1: {
      breakpoint: { max: 500, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <div dir="rtl" className="mt-[50px] md:mt-[80px] mb-[70px]">
        <div className="flex gap-2 overflow-x-scroll scroll_div relative">
          <div>
            <Button variant="secondary">
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
