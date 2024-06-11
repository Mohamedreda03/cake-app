"use client";

import useCart from "@/store/cartStore";
import { ArrowLeftIcon, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function CartCounter() {
  const cart = useCart();
  const session = useSession();
  return (
    <div className="flex items-center gap-3">
      {session?.data?.user && session.data?.user.role !== "USER" && (
        <Link href="/dashboard">
          <Button variant="outline">
            لوحة التحكم
            <ArrowLeftIcon size={15} className="mr-1" />
          </Button>
        </Link>
      )}

      {session.data?.user.role === "USER" && (
        <Button onClick={() => signOut()} variant="outline">
          تسجيل الخروج
          <ArrowLeftIcon size={15} className="mr-1" />
        </Button>
      )}

      <Link
        href="/cart"
        className="bg-color-2 text-white px-5 py-2 rounded-full flex items-center gap-2"
      >
        <span className="text-xl">{cart.items.length}</span>
        <ShoppingBag size={20} />
      </Link>
    </div>
  );
}
