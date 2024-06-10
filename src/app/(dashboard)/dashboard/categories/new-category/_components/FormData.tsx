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
import { CategoryFormTypes, UserForm } from "@/types/schema";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import uploadImage from "@/actions/upload-image";
import UploadWidget from "@/components/Cloudinary";
import Image from "next/image";
import { set } from "zod";

const FormData = () => {
  const [image, setImage] = useState<string | null>("");
  const [isLoading, startLoading] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormTypes>({
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: CategoryFormTypes) => {
      await axios.post("/api/categories", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success("تم انشاء الفئة بنجاح");
    },
  });

  const onSubmit = async (formData: any) => {
    startLoading(async () => {
      mutate(formData);
      router.push("/dashboard/categories");
    });
    console.log(formData);
  };

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
              src={form.getValues("image")}
              height={300}
              width={300}
              objectFit="cover"
              className="rounded-lg"
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
              {/* <FormField
                control={form.control}
                name="image"
                rules={{ required: "صورة الفئة مطلوبة" }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>صورة المنتج</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        disabled={isLoading}
                        placeholder="صورة المنتج"
                        onChange={(e) => field.onChange(e.target.files![0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "أسم الفئة مطلوب" }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>أسم المستخدم</FormLabel>
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
              className="w-full sm:w-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "جاري الانشاء..." : "انشاء الفئة"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormData;
