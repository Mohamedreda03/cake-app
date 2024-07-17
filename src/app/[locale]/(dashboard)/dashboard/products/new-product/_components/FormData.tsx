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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProductFormTypes, ProductSchema } from "@/types/schema";
import { use, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Category, CategoryTranslation } from "@prisma/client";
import SizeModel from "@/components/models/SizeModel";
import { cn } from "@/lib/utils";
import ImageUpload from "@/components/ImageUpload";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

interface CategoryForm extends Category {
  translation: CategoryTranslation[];
}

const FormData = ({ categories }: { categories: CategoryForm[] }) => {
  const [isOpenSizeModel, setOpenSizeModel] = useState(false);
  const [sizes, setSizes] = useState<
    { size: string; price: number; id: number }[]
  >([]);
  const [currentSize, setCurrentSize] = useState<{
    size: string;
    price: number;
    id: number;
  } | null>(null);

  const t = useTranslations("Dash_Products");
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ProductFormTypes>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name_ar: "",
      name_en: "",
      description_ar: "",
      description_en: "",
      categoryId: "",
      image: "",
      best_seller: false,
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      await axios.post("/api/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success(t("product_created_success"));
      router.push("/dashboard/products");
    },
    onError: () => {
      toast.error(t("all_fields_required"));
    },
  });

  const onSubmit = async (formData: ProductFormTypes) => {
    mutate({ ...formData, sizes });
  };

  const handleCloase = () => {
    router.push("/dashboard/products");
  };

  return (
    <>
      <SizeModel
        isOpen={isOpenSizeModel}
        onClose={() => setOpenSizeModel(false)}
        setSizes={setSizes}
        currentSize={currentSize}
        setCurrentSize={setCurrentSize}
        type="add"
      />

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="max-w-[900px] w-full px-5 py-10 md:px-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10 w-full"
            >
              <div className="flex flex-col gap-5 w-full">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("product_photo")}</FormLabel>
                      <FormControl>
                        <ImageUpload
                          label={t("product_photo")}
                          value={field.value ? [field.value] : []}
                          disabled={isLoading}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name_ar"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t("product_name_ar")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={t("product_name_ar")}
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
                      <FormLabel>{t("product_name_en")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={t("product_name_en")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("product_desc_ar")}</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder={t("product_desc_ar")}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("product_desc_en")}</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder={t("product_desc_en")}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("product_category")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("product_category")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.translation[0].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <div className="border p-5 mb-3 rounded-lg">
                    {sizes.map((size, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center justify-between gap-3 p-3",
                          {
                            "border-b border-gray-200":
                              index !== sizes.length - 1,
                          }
                        )}
                      >
                        <div className="flex items-center gap-9 text-xl">
                          <span>
                            {size.size} {t("cm")}
                          </span>
                          <span> : </span>
                          <span>
                            {size.price}{" "}
                            <span className="mr-1">{t("curancy")}</span>
                          </span>
                        </div>
                        <span className="flex items-center justify-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setCurrentSize(size);

                              setOpenSizeModel(true);
                            }}
                          >
                            {t("edit")}
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                              setSizes((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                          >
                            {t("delete")}
                          </Button>
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    onClick={() => {
                      setCurrentSize(null);
                      setOpenSizeModel(true);
                    }}
                  >
                    {t("product_size")}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  variant="main"
                  disabled={isLoading}
                  className="w-full sm:w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? t("construction_underway") : t("add_product")}
                </Button>

                <Button
                  onClick={handleCloase}
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                >
                  {t("cancel")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormData;
