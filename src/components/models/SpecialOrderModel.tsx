"use client";

import Alert from "./Alert";
import { Button } from "../ui/button";
import { useTransition } from "react";

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
import { Textarea } from "../ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

interface SpecialOrderModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpecialOrderForm = z.object({
  quantity: z.coerce.number().positive().int().min(1),
  description: z.string().min(2),
  cafe_name: z.string().min(2),
  order_maker_name: z.string().min(2),
  phone: z.string().min(7),
  address: z.string().min(2),
});

type SpecialOrderType = z.infer<typeof SpecialOrderForm>;

export default function SpecialOrderModel({
  isOpen,
  onClose,
}: SpecialOrderModelProps) {
  const [isLoading, startLoading] = useTransition();
  const form = useForm<SpecialOrderType>({
    resolver: zodResolver(SpecialOrderForm),
    defaultValues: {
      quantity: 1,
      description: "",
      cafe_name: "",
      order_maker_name: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = (data: SpecialOrderType) => {
    startLoading(async () => {
      await axios.post("/api/special-orders", data);

      toast.success("تم ارسال الطلب بنجاح");
      onClose();
    });
  };

  return (
    <Alert title="" isOpen={isOpen} onClose={onClose}>
      <h3 className="flex items-center justify-center text-2xl mb-4">
        أنشاء طلب خاص
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
                  name="order_maker_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>أسم صاحب الطلب</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="أسم صاحب الطلب"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cafe_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>أسم المقهى</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="أسم المقهى"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="رقم الهاتف"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>العنوان</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="العنوان"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  rules={{ required: "أسم الفئة مطلوب" }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>الكمية</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="الكمية"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>الوصف</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder="الوصف"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant="main" type="submit" disabled={isLoading}>
                  أرسال الطلب
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Alert>
  );
}
