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
import { UserForm } from "@/types/schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const FormData = ({ data }: { data: User }) => {
  const [isMounted, setIsMounted] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<UserForm>({
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      role: data?.role,
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newData: any) => {
      await axios.patch(`/api/users/${data.id}`, newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("تم تحديث المستخدم بنجاح");
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
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>أسم المستخدم</FormLabel>
                    <FormControl>
                      <Input
                        className="focus:"
                        disabled={isLoading}
                        placeholder="أسم المستخدم"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ألايمال</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        placeholder="e.g example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الصلاحيه</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isLoading}
                        dir="rtl"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="اختر الصلاحيه" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                            <SelectItem value="WRITER">WRITER</SelectItem>
                            <SelectItem value="USER">USER</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
              {isLoading ? "جاري التحديث..." : "حفظ التغيرات"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormData;
