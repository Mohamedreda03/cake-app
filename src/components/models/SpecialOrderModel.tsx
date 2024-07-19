"use client";

import Alert from "./Alert";
import { Button } from "../ui/button";
import { memo, useTransition } from "react";

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
import useSpecialProduct from "@/store/specialProduct";
import { useTranslations } from "next-intl";

interface SpecialOrderModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpecialOrderForm = z.object({
  quantity: z.coerce.number().positive().int().min(1),
  description: z.string().min(2),
});

type SpecialOrderType = z.infer<typeof SpecialOrderForm>;

function SpecialOrderModel({ isOpen, onClose }: SpecialOrderModelProps) {
  const [isLoading, startLoading] = useTransition();
  const t = useTranslations("Models");
  const form = useForm<SpecialOrderType>({
    resolver: zodResolver(SpecialOrderForm),
    defaultValues: {
      quantity: 1,
      description: "",
    },
  });

  const specialCart = useSpecialProduct();

  const onSubmit = (data: SpecialOrderType) => {
    specialCart.addItem(data);
    form.reset();
    onClose();
  };

  return (
    <Alert title="" isOpen={isOpen} onClose={onClose}>
      <h3 className="flex items-center justify-center text-2xl mb-4">
        {t("create_special_order")}
      </h3>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div>
              <div className="flex flex-col gap-3 w-full">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t("quantity")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={t("quantity")}
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
                      <FormLabel>{t("description")}</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder={t("description")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant="main" type="submit" disabled={isLoading}>
                  {t("add_to_cart")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Alert>
  );
}

export default memo(SpecialOrderModel);
