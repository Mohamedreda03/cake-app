"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import ProductCard from "./ProductCard";
// import { featchDataFromApi } from "../utils/api";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const CategoriesMenu = ({
  data,
  setCurrentCategory,
}: {
  data: Category[];
  setCurrentCategory: Dispatch<SetStateAction<string | null>>;
}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1040 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 900 },
      items: 4,
    },
    tablet1: {
      breakpoint: { max: 900, min: 630 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 630, min: 4000 },
      items: 2,
    },
    mobile1: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div dir="rtl" className="mt-[50px] md:mt-[100px] mb-[100px]">
        <Carousel
          responsive={responsive}
          containerClass="-mx-[10px]"
          itemClass="px-[10px]"
          swipeable={true}
          autoPlay={true}
          rtl={true}
          className="direction-rtl"
          customRightArrow={
            <ChevronLeft className="bg-color-4/45 h-12 w-12 text-black/40 absolute top-[40%] left-0 hover:text-black/80 hover:bg-color-4/80 transition-all rounded-full p-2 cursor-pointer" />
          }
          customLeftArrow={
            <ChevronRight className="bg-color-4/45 h-12 w-12 text-black/40 absolute top-[40%] right-0 hover:text-black/80 hover:bg-color-4/80 transition-all rounded-full p-2 cursor-pointer" />
          }
        >
          <div
            onClick={() => setCurrentCategory(null)}
            className="h-[300px] md:h-[230px] border p-3 rounded-2xl hover:bg-color-1/35 transition-all cursor-pointer"
          >
            <Image
              src="/all-cakes.jpg"
              width={200}
              height={200}
              alt="category image"
              className="w-full h-[220px] md:h-[150px] rounded-xl object-cover"
            />
            <div className="relative flex h-[50px] items-center justify-center text-2xl w-fit mx-auto">
              الكل
              <div className="absolute bottom-2 w-full h-4 bg-color-4/40 -z-10"></div>
            </div>
          </div>
          {data.map((category) => (
            <div
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className="h-[300px] md:h-[230px] border p-3 rounded-2xl hover:bg-color-1/35 transition-all cursor-pointer"
            >
              <Image
                src={category.image}
                width={200}
                height={200}
                alt="category image"
                className="w-full h-[220px] md:h-[150px] rounded-xl object-cover"
              />
              <div className="relative flex h-[50px] items-center justify-center text-2xl w-fit mx-auto">
                {category.name}
                <div className="absolute bottom-2 w-full h-4 bg-color-4/40 -z-10"></div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default CategoriesMenu;
