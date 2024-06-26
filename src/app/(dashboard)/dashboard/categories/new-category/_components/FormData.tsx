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
import { zodResolver } from "@hookform/resolvers/zod";

const FormData = () => {
  const [image, setImage] = useState<string | null>("");
  const [isLoading, startLoading] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormTypes>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: CategoryFormTypes) => {
      await axios.post("/api/categories", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success("تم انشاء الفئة بنجاح");
      router.push("/dashboard/categories");
    },
    onError: () => {
      toast.error("جميع البيانات مطلوبة");
    },
  });

  const onSubmit = async (formData: any) => {
    mutate(formData);
  };

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
