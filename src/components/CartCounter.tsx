"use client";

import useCart from "@/store/cartStore";
import { ArrowLeftIcon, Globe, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

import useSpecialProduct from "@/store/specialProduct";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Link } from "@/hooks/navigation";

import { usePathname } from "next/navigation";
import LangButton from "./LangButton";

export default function CartCounter() {
  const cart = useCart();
  const specialCart = useSpecialProduct();
  const session = useSession();
  const locale = useLocale();
  const t = useTranslations("Navigation");

  // console.log(pathname.split("/")[2]);

  return (
    <Link href="/cart" className="relative">
      <span className="absolute -top-2 -right-2 flex items-center justify-center text-white rounded-full p-1 bg-color-2 w-5 h-5">
        {cart.items.length + specialCart.items.length}
      </span>
      <ShoppingCart size={30} />
    </Link>
  );
}
