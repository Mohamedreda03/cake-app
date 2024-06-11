"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import ProductCard from "./ProductCard";
// import { featchDataFromApi } from "../utils/api";

import { ChevronLeft, ChevronRight } from "lucide-react";
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
        {/* <Carousel
          responsive={responsive}
          containerClass="-mx-[10px]"
          itemClass="px-[10px]"
          swipeable={true}
          // autoPlay={true}
          rtl={true}
          className="direction-rtl"
          customRightArrow={
            // <ChevronLeft className="bg-color-4/45 h-12 w-12 text-black/40 absolute top-[50%] left-0 hover:text-black/80 hover:bg-color-4/80 transition-all rounded-full p-2 cursor-pointer" />
            <div></div>
          }
          customLeftArrow={
            // <ChevronRight className="bg-color-4/45 h-12 w-12 text-black/40 absolute top-[50%] right-0 hover:text-black/80 hover:bg-color-4/80 transition-all rounded-full p-2 cursor-pointer" />
            <div></div>
          }
        >
          <div
            onClick={() => setCurrentCategory(null)}
            className={cn(
              "border px-3 py-1 rounded-lg hover:bg-color-1/35 transition-all cursor-pointer",
              currentCategory === null && "bg-color-1/35"
            )}
          >
            <div className="relative flex items-center justify-center text-xl w-fit mx-auto">
              الكل
              <div className="absolute bottom-4 w-full h-2 bg-color-4/40 -z-10"></div>
            </div>
          </div>
          {data.map((category) => (
            <div
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={cn(
                "border px-3 py-1 rounded-md hover:bg-color-1/35 transition-all cursor-pointer",
                currentCategory === category.id && "bg-color-1/20"
              )}
            >
              <div className="relative flex items-center justify-center text-xl w-fit mx-auto">
                {category.name}
                <div className="absolute bottom-4 w-full h-2 bg-color-4/20 -z-10"></div>
              </div>
            </div>
          ))}
        </Carousel> */}
        <div className="flex gap-2 overflow-x-scroll scroll_div relative">
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
