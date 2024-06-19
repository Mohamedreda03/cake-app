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
import { ProductFormTypes } from "@/types/schema";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@prisma/client";
import SizeModel from "@/components/models/SizeModel";
import { cn } from "@/lib/utils";
import ImageUpload from "@/components/ImageUpload";

const FormData = ({ categories }: { categories: Category[] }) => {
  const [isOpenSizeModel, setOpenSizeModel] = useState(false);
  const [sizes, setSizes] = useState<
    { size: string; price: number; id: number }[]
  >([]);
  const [currentSize, setCurrentSize] = useState<{
    size: string;
    price: number;
    id: number;
  } | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ProductFormTypes>({
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      image: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      await axios.post("/api/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("تم انشاء المنتج بنجاح");
      router.push("/dashboard/products");
    },
    onError: () => {
      toast.error("جميع الحقول مطلوبة.");
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
                      <FormLabel>صورة المنتج</FormLabel>
                      <FormControl>
                        <ImageUpload
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
                  name="name"
                  rules={{ required: "يرجى ادخال اسم المنتج" }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>أسم المنتج</FormLabel>
                      <FormControl>
                        <Input
                          className=""
                          disabled={isLoading}
                          placeholder="أسم امنتج"
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
                  rules={{ required: "يرجى ادخال وصف المنتج" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الوصف</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder="قم بكتابة وصف للمنتج"
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
                  rules={{ required: "يرجى اختيار الفئة" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>أختر الفئة</FormLabel>
                      <Select
                        dir="rtl"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="فئة المنتج" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
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
                          <span>{size.size} سم</span>
                          <span> : </span>
                          <span>
                            {size.price} <span className="mr-1">ريال</span>
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
                            تعديل
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
                            حذف
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
                    انشاء حجم جديد
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="main"
                  disabled={isLoading}
                  type="submit"
                  className="w-full sm:w-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "جاري الانشاء..." : "انشاء المنتج"}
                </Button>

                <Button
                  onClick={handleCloase}
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                >
                  ألغاء
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
