import Alert from "./Alert";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import useCart from "@/store/cartStore";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface SpecialOrderModelProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

// interface SpecialOrderType {
//   quantity: number;
//   description: string;
// }

const SpecialOrderType = z.object({
  quantity: z.number().min(1),
  description: z.string().min(2),
});

export default function SpecialOrderModel({
  isOpen,
  onClose,
}: SpecialOrderModelProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const form = useForm<SpecialOrderType>({
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Alert title={""} isOpen={isOpen} onClose={onClose}>
      <div dir="rtl" className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div>
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
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" onClick={onClose} variant="outline">
                إلغاء
              </Button>
              <Button variant="main">أضف إلى السلة</Button>
            </div>
          </form>
        </Form>
      </div>
    </Alert>
  );
}
