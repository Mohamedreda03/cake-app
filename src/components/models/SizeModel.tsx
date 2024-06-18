"use client";

import Alert from "./Alert";
import { Button } from "../ui/button";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";

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

interface SizeModelProps {
  isOpen: boolean;
  onClose: () => void;
  currentSize: { size: string; price: number; id: number } | null;
  setCurrentSize: Dispatch<
    SetStateAction<{ size: string; price: number; id: number } | null>
  >;
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

export default function SizeModel({
  isOpen,
  onClose,
  setSizes,
  currentSize,
  setCurrentSize,
}: SizeModelProps) {
  const [isLoading, startLoading] = useTransition();

  const form = useForm<SpecialOrderType>({
    resolver: zodResolver(SpecialOrderForm),
    defaultValues: {
      size: "",
      price: 0,
    },
  });

  useEffect(() => {
    form.reset({
      size: currentSize?.size || "",
      price: currentSize?.price || 0,
    });
  }, [currentSize]);

  const addSize = (size: string, price: number) => {
    setSizes((prev) => [...prev, { size, price, id: prev.length + 1 }]);
  };

  const updateSize = (id: number, size: string, price: number) => {
    setSizes((prev) =>
      prev.map((item) => (item.id === id ? { size, price, id } : item))
    );
  };

  const onSubmit = async (data: { size: string; price: number }) => {
    if (currentSize) {
      updateSize(currentSize.id, data.size, data.price);
      form.reset();
      onClose();
      setCurrentSize(null);
      return;
    }
    startLoading(() => {
      addSize(data.size, data.price);
      form.reset();
      onClose();
    });
  };

  return (
    <Alert title="" isOpen={isOpen} onClose={onClose}>
      <h3 className="flex items-center justify-center text-2xl mb-4">
        {currentSize ? "تعديل الحجم" : "أنشاء حجم جديد"}
      </h3>
      <div dir="rtl" className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div>
              <div className="flex flex-col gap-3 w-full">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>الحجم</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="الحجم"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>السعر</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="السعر"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant="main" type="submit" disabled={isLoading}>
                  {currentSize ? "تعديل الحجم" : "أنشاء حجم جديد"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Alert>
  );
}
