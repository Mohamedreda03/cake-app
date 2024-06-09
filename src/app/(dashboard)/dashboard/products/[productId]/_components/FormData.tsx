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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Category, Product } from "@prisma/client";
import uploadImage from "@/actions/upload-image";
import Image from "next/image";
import { Link } from "lucide-react";
import UploadWidget from "@/components/Cloudinary";

const FormData = ({
  data,
  categories,
}: {
  data: Product;
  categories: Category[];
}) => {
  const { productId } = useParams();
  const [image, setImage] = useState<string | null>(data.image);

  const queryClient = useQueryClient();

  const form = useForm<ProductFormTypes>({
    defaultValues: {
      name: data.name,
      size: data.size,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
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

  const onSubmit = (formData: ProductFormTypes) => {
    mutate(formData);
  };

  const handleUploadSuccess = (imageUrl: any) => {
    form.setValue("image", imageUrl?.info?.secure_url);
    setImage(imageUrl?.info?.secure_url);
  };

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="max-w-[900px] w-full px-5 py-10 md:px-20">
        <div className="mb-5">
          {image && (
            <Image
              src={image}
              width={200}
              height={200}
              alt="product image"
              className="rounded-lg"
            />
          )}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-10 w-full"
          >
            <div className="flex flex-col gap-5 w-full">
              <UploadWidget
                handleUploadSuccess={handleUploadSuccess}
                title="تحديث الصوره"
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
                name="size"
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
  );
};

export default FormData;
