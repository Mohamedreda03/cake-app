"use client";

import CartItem from "@/components/CartItem";
import SpecialCartItem from "@/components/SpecialCartItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useCart, { type CartItemType } from "@/store/cartStore";
import useSpecialProduct, { SpecialProductType } from "@/store/specialProduct";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function Cart({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [cafeName, setCafeName] = useState<string>("");
  const [orderMakerName, setOrderMakerName] = useState<string>("");
  const router = useRouter();
  const cart = useCart();
  const specialCart = useSpecialProduct();
  const [paymentOption, setPaymentOption] = useState<boolean>(true);

  const t = useTranslations("CartPage");
  const tMore = useTranslations("More");
  const tOrder = useTranslations("Order_Data");

  const total = cart.items.reduce((acc, item) => acc + item.total, 0);

  const [isPending, startPending] = useTransition();

  const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cafeName || !orderMakerName || !address || !phone) {
      toast.error(
        locale === "ar" ? "الرجاء ملء جميع الحقول" : "Please fill all fields"
      );
      return;
    }

    startPending(async () => {
      if (paymentOption) {
        const order = await axios.post("/api/orders", {
          cafe_name: cafeName,
          order_maker_name: orderMakerName,
          address: address,
          phone: phone,
          total: total,
          items: cart.items,
          special_items: specialCart.items,
          status: "FAILED",
          payment_status: "FAILED",
        });

        await axios
          .request({
            url: "https://api.moyasar.com/v1/invoices",
            method: "POST",
            auth: {
              username: process.env.NEXT_PUBLIC_MOYASAR_API_KEY!,
              password: "",
            },
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              amount: total * 100,
              currency: "SAR",
              description: `cafe_name: ${cafeName}\n order_maker_name: ${orderMakerName}\n address: ${address}\n phone: ${phone}\n total: ${total}`,
              success_url: `${process.env.NEXT_PUBLIC_URL!}/cart/success`,
              metadata: {
                orderId: order.data.data.id,
              },
            },
          })
          .then(async (res) => {
            router.replace(res.data.url);
          })
          .catch((err) => console.log(err));
      } else {
        await axios
          .post("/api/orders", {
            cafe_name: cafeName,
            order_maker_name: orderMakerName,
            address: address,
            phone: phone,
            total: total,
            items: cart.items,
            special_items: specialCart.items,
          })
          .then(() => {
            toast.success(
              locale === "ar"
                ? "تم ارسال الطلب بنجاح"
                : "Order sent successfully"
            );
            router.push("/cart/success");
            cart.clearCart();
            specialCart.clearCart();
          })
          .catch((error) => {
            toast.error(locale === "ar" ? "حدث خطأ" : "An error occurred");
            console.error("ERROR ORDER: => ", error);
          });
      }
    });
  };

  return (
    <div className="py-8 px-5 md:px-7 max-w-screen-xl mx-auto flex flex-col gap-6 min-h-[600px]">
      <h1 className="text-center text-5xl font-medium text-primary border-b-2 border-color-1 w-fit">
        {t("title")}
      </h1>
      {cart.items.length < 1 && specialCart.items.length < 1 ? (
        <div className="text-center text-lg text-muted-foreground">
          {t("empty_cart")}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[1.2]">
            <div className="flex flex-col gap-3 w-full">
              {cart.items.map((data: CartItemType, i) => (
                <CartItem key={i} item={data} />
              ))}
            </div>
            {specialCart.items.length > 0 && (
              <div className="flex flex-col gap-3 w-full">
                <h3 className="text-2xl mt-10">{t("special_order")}</h3>
                {specialCart.items.map((data: SpecialProductType) => {
                  return <SpecialCartItem key={data.id} item={data} />;
                })}
              </div>
            )}
          </div>
          <div className="w-full flex-[0.8]">
            <Card className="flex flex-col gap-4 p-6">
              <div>
                <h2 className="text-2xl font-medium">{t("order_summary")}</h2>
                <p className="text-muted-foreground mb-4">{t("desc")}</p>
              </div>

              <div className="flex items-center justify-between text-xl font-medium">
                <span>{t("total")}</span>
                <span className="border-b-2 text-2xl border-color-1">
                  {total} {tMore("curancy")}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-full h-[1PX] bg-gray-200" />
                <div>
                  <h3 className="text-lg font-medium">{t("select_payment")}</h3>
                </div>
                <div
                  onClick={() => setPaymentOption(true)}
                  className={cn(`px-3 py-3 border rounded-lg cursor-pointer`, {
                    "bg-color-1 text-white": paymentOption,
                  })}
                >
                  {t("online_payment")}
                </div>
                <div
                  onClick={() => setPaymentOption(false)}
                  className={cn(`px-3 py-3 border rounded-lg cursor-pointer`, {
                    "bg-color-1 text-white": !paymentOption,
                  })}
                >
                  {t("cash_payment")}
                </div>
                <div className="w-full h-[1PX] bg-gray-200" />
                <form onSubmit={handleCheckout}>
                  <div className="flex flex-col gap-3">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {tOrder("cafe_name")}
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setCafeName(e.target.value)}
                        value={cafeName}
                        disabled={isPending}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder={tOrder("cafe_name")}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {tOrder("name")}
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setOrderMakerName(e.target.value)}
                        value={orderMakerName}
                        disabled={isPending}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder={tOrder("name")}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {tOrder("address")}
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        disabled={isPending}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder={tOrder("address")}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {tOrder("phone")}
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        disabled={isPending}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder={tOrder("phone")}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    disabled={isPending}
                    variant="main"
                    className="rounded-full w-full mt-5 flex items-center justify-center gap-2"
                  >
                    <LoaderCircle
                      className={`w-5 h-5 animate-spin mr-2 ${
                        isPending ? "block" : "hidden"
                      }`}
                    />
                    {t("checkout")}
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
