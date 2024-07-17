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
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface SizeModelProps {
  isOpen: boolean;
  onClose: () => void;
  type: "add" | "edit";
  currentSize: {
    size: string;
    price: number;
    id: number;
  } | null;
  setCurrentSize: Dispatch<
    SetStateAction<{
      size: string;
      price: number;
      id: number;
    } | null>
  >;
  setSizes: Dispatch<
    SetStateAction<
      {
        // size_ar: string;
        // size_en: string;
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
  type,
  currentSize,
  setCurrentSize,
}: SizeModelProps) {
  const t = useTranslations("Dash_Products");
  const [isLoading, startLoading] = useTransition();
  const params = useParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isLoading: isLoadingCreateSize } = useMutation({
    mutationFn: async (data: any) => {
      await axios.post("/api/sizes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("sizes");
      toast.success(t("product_size_created_success"));
    },
  });

  const { mutate: updateSizeMutation, isLoading: isLoadingUpdateSize } =
    useMutation({
      mutationFn: async (data: any) => {
        await axios.patch(`/api/sizes/${currentSize?.id}`, data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("sizes");
        toast.success(t("product_size_updated_success"));
      },
    });

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
    if (type === "add") {
      setSizes((prev) => [...prev, { size, price, id: prev.length + 1 }]);
    } else if (type === "edit") {
      mutate({ size, price, productId: params.productId });
      router.refresh();
    }
  };

  const updateSize = (id: number, size: string, price: number) => {
    if (type === "add") {
      setSizes((prev) =>
        prev.map((item) => (item.id === id ? { size, price, id } : item))
      );
    } else if (type === "edit") {
      updateSizeMutation({
        size,
        price,
        productId: params.productId,
      });
      router.refresh();
    }
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
        {currentSize ? t("product_size_edit") : t("product_size")}
      </h3>
      <div>
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
                      <FormLabel>{t("size")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={
                            isLoading ||
                            isLoadingCreateSize ||
                            isLoadingUpdateSize
                          }
                          placeholder={t("size")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="size_en"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t("size_en")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={
                            isLoading ||
                            isLoadingCreateSize ||
                            isLoadingUpdateSize
                          }
                          placeholder={t("size_en")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t("price")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={
                            isLoading ||
                            isLoadingCreateSize ||
                            isLoadingUpdateSize
                          }
                          placeholder={t("price")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="main"
                  type="submit"
                  disabled={
                    isLoading || isLoadingCreateSize || isLoadingUpdateSize
                  }
                >
                  {currentSize ? t("product_size_edit") : t("product_size")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Alert>
  );
}
