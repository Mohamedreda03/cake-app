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
import UploadWidget from "@/components/Cloudinary";
import Image from "next/image";

const FormData = ({ categories }: { categories: Category[] }) => {
  const [image, setImage] = useState<string | null>("");
  const [isLoading, startLoading] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ProductFormTypes>({
    defaultValues: {
      name: "",
      size: "",
      price: 0,
      categoryId: "",
      description: "",
      image: "",
    },
  });

  const { mutate } = useMutation({
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
    mutate(formData);
  };

  const handleCloase = () => {
    router.push("/dashboard/products");
  };

  const handleUploadSuccess = (imageUrl: any) => {
    form.setValue("image", imageUrl?.info?.secure_url);
    setImage(imageUrl?.info?.secure_url);
  };

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="max-w-[900px] w-full px-5 py-10 md:px-20">
        {image && (
          <div>
            <Image
              src={image}
              height={300}
              width={300}
              objectFit="cover"
              className="rounded-lg"
              alt="product image"
            />
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-10 w-full"
          >
            <div className="flex flex-col gap-5 w-full">
              <UploadWidget
                title="اضف صورة للمنتج"
                handleUploadSuccess={handleUploadSuccess}
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
                name="size"
                rules={{ required: "يرجى ادخال الحجم" }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>الحجم</FormLabel>
                    <FormControl>
                      <Input
                        className=""
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
                rules={{ required: "يرجى ادخال سعر المنتج" }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>سعر المنتج</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isLoading}
                        placeholder="السعر"
                        value={field.value!}
                        onChange={field.onChange}
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
  );
};

export default FormData;
