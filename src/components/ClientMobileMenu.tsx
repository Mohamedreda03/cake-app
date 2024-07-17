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

interface Menu {
  name: string;
  path: string;
}

export default function ClientMobileMenu() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const locale = useLocale();

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
      path: "/about",
    },
    {
      name: t("Billa_Factory"),
      path: "/factory",
    },
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
                      "py-3 px-4 hover:bg-color-3/45 hover:text-color-2 flex gap-3 items-center",
                      pathname === item.path
                        ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                        : "text-color-2"
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
                className={cn(session?.user ? "block" : "hidden")}
              >
                <div
                  className={cn(
                    "py-3 px-4 hover:bg-color-3/45 hover:text-color-2 flex gap-3 items-center",
                    pathname === "/dashboard/users"
                      ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                      : "text-color-2"
                  )}
                >
                  {t("dashboard")}
                </div>
              </Link>
            </SheetClose>

            <LangButton className="flex items-center w-full" />

            <Button
              variant="outline"
              className={cn(
                "w-full mt-3 flex items-center justify-center gap-2",
                {
                  hidden: !session?.user,
                  "flex-row-reverse": locale === "en",
                }
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
