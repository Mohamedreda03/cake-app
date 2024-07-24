"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, ArrowLeftIcon, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";
import LangButton from "./LangButton";
import { useEffect } from "react";

interface Menu {
  name: string;
  path: string;
}

export default function ClientMobileMenu() {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  const t = useTranslations("Navigation");

  useEffect(() => {}, [session]);

  const menu: Menu[] = [
    {
      name: t("home"),
      path: "/",
    },
    {
      name: t("menu"),
      path: "/menu",
    },
    {
      name: t("story"),
      path: "/story",
    },
    {
      name: t("Billa_Factory"),
      path: "/factory",
    },
    { name: t("orders"), path: "/orders" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={30} className="text-color-2 cursor-pointer md:hidden" />
      </SheetTrigger>
      <SheetContent>
        <div className="mt-20">
          <div className="flex flex-col mt-5 text-color-2">
            {menu.map((item) => (
              <SheetClose key={item.name} asChild>
                <Link href={item.path}>
                  <div
                    className={cn(
                      "py-3 px-4 hover:bg-color-3/45 hover:text-color-2 flex gap-3 items-center justify-center text-xl",
                      pathname === item.path
                        ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                        : "text-color-2",
                      { hidden: item.path === "/orders" && !session?.user }
                    )}
                  >
                    {item.name}
                  </div>
                </Link>
              </SheetClose>
            ))}

            <SheetClose asChild>
              <Link
                href="/dashboard/products"
                className={cn(
                  session?.user && session?.user.role !== "USER"
                    ? "block"
                    : "hidden",
                  session?.user.role === "ADMIN"
                    ? "/dashboard/products"
                    : "/dashboard/orders"
                )}
              >
                <div
                  className={cn(
                    "py-3 px-4 hover:bg-color-3/45 hover:text-color-2 flex gap-3 items-center justify-center text-xl",
                    pathname === "/dashboard/users"
                      ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                      : "text-color-2"
                  )}
                >
                  {t("dashboard")}
                </div>
              </Link>
            </SheetClose>

            <LangButton className="flex items-center w-full mt-2" />

            <Button
              variant="outline"
              className={cn(
                "w-full mt-3 items-center justify-center gap-2 flex-row-reverse",
                session?.user ? "flex" : "hidden"
              )}
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              {t("sign-out")}
              <ArrowLeftIcon size={15} />
            </Button>

            {!session?.user && (
              <Link href="/sign-in" className="w-full mt-3">
                <Button variant="outline" className="w-full">
                  {t("sign-in")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
