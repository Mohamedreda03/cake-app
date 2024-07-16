"use client";

import useCart from "@/store/cartStore";
import { ArrowLeftIcon, Globe, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

import useSpecialProduct from "@/store/specialProduct";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Link } from "@/hooks/navigation";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function CartCounter() {
  const cart = useCart();
  const specialCart = useSpecialProduct();
  const session = useSession();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  // console.log(pathname.split("/")[2]);

  return (
    <div className="flex items-center gap-7 min-w-[150px]">
      {session?.data?.user && session.data?.user.role !== "USER" && (
        <NextLink href="/dashboard/products" className="hidden md:block">
          <Button
            variant="outline"
            className={cn(locale === "en" ? "flex flex-row-reverse" : "")}
          >
            {t("dashboard")}
            <ArrowLeftIcon size={15} className="mr-1" />
          </Button>
        </NextLink>
      )}

      {session.data?.user.role === "USER" && (
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="hidden md:block"
        >
          {t("sign-out")}
          <ArrowLeftIcon size={15} className="mr-1" />
        </Button>
      )}

      <Link
        href={"/"}
        locale={locale === "ar" ? "en" : "ar"}
        className={cn(
          "flex items-center",
          locale === "en" ? "flex-row-reverse" : ""
        )}
      >
        <Button variant="secondary">
          <Globe
            size={20}
            className={cn("text-gray-500", locale === "ar" ? "ml-2" : "mr-2")}
          />
          {locale === "ar" ? "English" : "Arabic"}
        </Button>
      </Link>
      <Link href="/cart" className="relative">
        <span className="absolute -top-2 -right-2 flex items-center justify-center text-white rounded-full p-1 bg-color-2 w-5 h-5">
          {cart.items.length + specialCart.items.length}
        </span>
        <ShoppingCart size={30} />
      </Link>
    </div>
  );
}
