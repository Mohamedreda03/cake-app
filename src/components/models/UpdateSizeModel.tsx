"use client";

import Alert from "./Alert";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface UpdateSizeModelProps {
  isOpen: boolean;
  onClose: () => void;
  // currentSize: { size: string; price: number; id: number };
  onSubmitSize: any;
  formSize: any;
  setSizes: Dispatch<
    SetStateAction<
      {
        size: string;
        price: number;
        id: number;
      }[]
    >
  >;
}

const SpecialOrderForm = z.object({
  size: z.string().min(1),
  price: z.coerce.number().positive().int().min(1),
});

type SpecialOrderType = z.infer<typeof SpecialOrderForm>;

export default function UpdateSizeModel({
  isOpen,
  onClose,
  setSizes,
  // currentSize,
  onSubmitSize,
  formSize,
}: UpdateSizeModelProps) {
  // const [isLoading, startLoading] = useTransition();

  // console.log(currentSize);

  // const form = useForm<SpecialOrderType>({
  //   resolver: zodResolver(SpecialOrderForm),
  //   defaultValues: {
  //     size: currentSize?.size,
  //     price: currentSize?.price,
  //   },
  // });

  // const updateSize = (id: number, size: string, price: number) => {
  //   setSizes((prev) =>
  //     prev.map((item, index) =>
  //       index === id ? { ...item, size, price } : item
  //     )
  //   );
  // };

  // const onSubmit = async (data: any) => {
  //   startLoading(() => {
  //     updateSize(data.id, data.size, data.price);
  //     form.reset();
  //     onClose();
  //   });
  // };

  return (
    <Alert title="" isOpen={isOpen} onClose={onClose}>
      <h3 className="flex items-center justify-center text-2xl mb-4">
        تعديل الحجم
      </h3>
      <div dir="rtl" className="">
        <Form {...formSize}>
          <form
            onSubmit={formSize.handleSubmit(onSubmitSize)}
            className="space-y-8 w-full"
          >
            <div>
              <div className="flex flex-col gap-3 w-full">
                <FormField
                  control={formSize.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>الحجم</FormLabel>
                      <FormControl>
                        <Input placeholder="الحجم" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formSize.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>السعر</FormLabel>
                      <FormControl>
                        <Input placeholder="السعر" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant="main" type="submit">
                  تعديل الحجم
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Alert>
  );
}
