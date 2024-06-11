"use client";

import useCart from "@/store/cartStore";
import { ArrowLeftIcon, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useSpecialProduct from "@/store/specialProduct";

export default function CartCounter() {
  const cart = useCart();
  const specialCart = useSpecialProduct();
  const session = useSession();
  return (
    <div className="flex items-center gap-7">
      {session?.data?.user && session.data?.user.role !== "USER" && (
        <Link href="/dashboard/products" className="hidden md:block">
          <Button variant="outline">
            لوحة التحكم
            <ArrowLeftIcon size={15} className="mr-1" />
          </Button>
        </Link>
      )}

      {session.data?.user.role === "USER" && (
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="hidden md:block"
        >
          تسجيل الخروج
          <ArrowLeftIcon size={15} className="mr-1" />
        </Button>
      )}

      <Link
        href="/cart"
        // className="bg-color-2 text-white px-5 py-2 rounded-full flex items-center gap-2"
        className="relative"
      >
        <span className="absolute -top-2 -right-2 flex items-center justify-center text-white rounded-full p-1 bg-color-2 w-5 h-5">
          {cart.items.length + specialCart.items.length}
        </span>
        <ShoppingCart size={30} />
      </Link>
    </div>
  );
}
