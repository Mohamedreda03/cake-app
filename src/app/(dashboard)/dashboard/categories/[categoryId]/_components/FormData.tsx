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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CategoryFormTypes, UserForm } from "@/types/schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Category, User } from "@prisma/client";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import UploadWidget from "@/components/Cloudinary";
import Image from "next/image";

const FormData = ({ data }: { data: Category }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [image, setImage] = useState<string | null>(data?.image);

  const queryClient = useQueryClient();

  const form = useForm<CategoryFormTypes>({
    defaultValues: {
      name: data?.name || "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newData: any) => {
      await axios.patch(`/api/categories/${data.id}`, newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("تم تحديث الفئة بنجاح");
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

  const handleUploadSuccess = (imageUrl: any) => {
    form.setValue("image", imageUrl?.info?.secure_url);
    setImage(imageUrl?.info?.secure_url);
  };

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="max-w-[900px] w-full px-5 py-10 md:px-20">
        {image && (
          <div className="w-full h-[300px] relative">
            <Image
              src={image}
              height={300}
              width={300}
              objectFit="cover"
              className="rounded-lg h-[300px] w-[300px] object-cover"
              alt="category image"
            />
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex flex-col gap-3 w-full">
              <UploadWidget
                title="رفع صورة"
                handleUploadSuccess={handleUploadSuccess}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>أسم الفئة</FormLabel>
                    <FormControl>
                      <Input
                        className="focus:"
                        disabled={isLoading}
                        placeholder="أسم الفئة"
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
