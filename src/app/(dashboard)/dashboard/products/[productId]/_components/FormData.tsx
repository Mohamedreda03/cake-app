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
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Category, Product, Size } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/ImageUpload";
import SizeModel from "@/components/models/SizeModel";
import { cn } from "@/lib/utils";
import DeleteModel from "@/components/models/DeleteModel";

const FormData = ({
  data,
  categories,
}: {
  data: Product;
  categories: Category[];
}) => {
  const { productId } = useParams();
  const [isOpenSizeModel, setOpenSizeModel] = useState(false);
  const [isOpenDeleteModel, setOpenDeleteModel] = useState(false);
  const [sizes, setSizes] = useState<
    { size: string; price: number; id: number }[]
  >([]);
  const [currentSize, setCurrentSize] = useState<{
    size: string;
    price: number;
    id: number;
  } | null>(null);

  const queryClient = useQueryClient();

  const form = useForm<ProductFormTypes>({
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      categoryId: data?.categoryId || "",
      best_seller: data?.best_seller || false,
      image: data?.image || "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      await axios.patch(`/api/products/${productId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("تم تحديث المنتج بنجاح");
    },
  });

  const { mutate: deleteSize, isLoading: isDeleteLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/sizes/${currentSize?.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("sizes");
      toast.success("تم حذف الحجم بنجاح");
      setOpenDeleteModel(false);
    },
  });

  const { data: sizesData } = useQuery({
    queryKey: "sizes",
    queryFn: async () => {
      const res = await axios.get(`/api/sizes?productId=${productId}`);
      return res.data;
    },
  });

  const onSubmit = (formData: ProductFormTypes) => {
    mutate(formData);
    console.log(formData);
  };

  const onDeleteSize = async () => {
    deleteSize();
    queryClient.invalidateQueries("sizes");
    setOpenDeleteModel(false);
  };

  return (
    <>
      <SizeModel
        isOpen={isOpenSizeModel}
        onClose={() => setOpenSizeModel(false)}
        setSizes={setSizes}
        currentSize={currentSize}
        setCurrentSize={setCurrentSize}
        type="edit"
      />
      <DeleteModel
        isOpen={isOpenDeleteModel}
        onClose={() => setOpenDeleteModel(false)}
        onDelete={onDeleteSize}
        title="حذف الحجم"
        description="هل انت متأكد من حذف الحجم"
        isLoading={isDeleteLoading}
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الوصف</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="قم بكتابة وصف للمنتج"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="border p-5 mb-3 rounded-lg">
                    {sizesData?.data.map((size: any, index: number) => (
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
                              setCurrentSize(size as any);

                              setOpenSizeModel(true);
                            }}
                          >
                            تعديل
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                              setCurrentSize(size as any);
                              setOpenDeleteModel(true);
                            }}
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

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>أختر الفئة</FormLabel>
                      <Select
                        dir="rtl"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="فئة المنتج" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="border border-gray-200 p-3 rounded-md">
                  <FormField
                    control={form.control}
                    name="best_seller"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              disabled={isLoading}
                              checked={field.value as any}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-md">
                            منتج اكثر مبيعا
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="main"
                  disabled={isLoading}
                  type="submit"
                  className="w-full sm:w-[150px]"
                >
                  {isLoading ? "جاري التحديث..." : "تحديث المنتج"}
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
