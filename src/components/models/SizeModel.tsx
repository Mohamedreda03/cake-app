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

interface SizeModelProps {
  isOpen: boolean;
  onClose: () => void;
  setSizes: Dispatch<
    SetStateAction<
      {
        size: string;
        price: number;
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
}: SizeModelProps) {
  const [isLoading, startLoading] = useTransition();

  const form = useForm<SpecialOrderType>({
    resolver: zodResolver(SpecialOrderForm),
    defaultValues: {
      size: "",
      price: 0,
    },
  });

  const addSize = (size: string, price: number) => {
    setSizes((prev) => [...prev, { size, price }]);
  };

  const onSubmit = async (data: { size: string; price: number }) => {
    startLoading(() => {
      addSize(data.size, data.price);
      form.reset();
      onClose();
    });
  };

  return (
    <Alert title="" isOpen={isOpen} onClose={onClose}>
      <h3 className="flex items-center justify-center text-2xl mb-4">
        أنشاءحجم جديد
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
                  اضافة الحجم
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Alert>
  );
}
