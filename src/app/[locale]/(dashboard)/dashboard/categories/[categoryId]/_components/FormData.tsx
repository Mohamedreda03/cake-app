"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { CategoryFormTypes, CategorySchema, UserForm } from "@/types/schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Category, CategoryTranslation } from "@prisma/client";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

interface CategoryData extends Category {
  translation: CategoryTranslation[];
}

const FormData = ({ data }: { data: CategoryData }) => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("Dash_Categories");

  const queryClient = useQueryClient();

  const form = useForm<CategoryFormTypes>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name_ar: data.translation[0].name || "",
      name_en: data.translation[1].name || "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newData: any) => {
      await axios.patch(`/api/categories/${data.id}`, newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success(t("category_updated_success"));
    },
  });

  const onSubmit = (formData: any) => {
    mutate(formData);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="max-w-[900px] w-full px-5 py-10 md:px-20">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="name_ar"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("category_name_ar")}</FormLabel>
                    <FormControl>
                      <Input
                        className="focus:"
                        disabled={isLoading}
                        placeholder={t("category_name_ar")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name_en"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("category_name_en")}</FormLabel>
                    <FormControl>
                      <Input
                        className="focus:"
                        disabled={isLoading}
                        placeholder={t("category_name_en")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              variant="main"
              disabled={isLoading}
              type="submit"
              className="w-full sm:w-[150px]"
            >
              حفظ التغيرات
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormData;
