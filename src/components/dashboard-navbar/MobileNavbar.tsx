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
import {
  LucideIcon,
  LayoutDashboard,
  Package2,
  PackageOpen,
  Users,
  Home,
  Menu,
  ArrowLeftIcon,
  ArrowLeft,
} from "lucide-react";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useLocale, useTranslations } from "next-intl";

interface Menu {
  name: string;
  path: string;
  Icon: LucideIcon;
}

export default function MobileNavbar() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const t = useTranslations("Dash_sidebar");
  const locale = useLocale();

  const menu: Menu[] = [
    {
      name: t("products"),
      path: "/dashboard/products",
      Icon: Package2,
    },
    {
      name: t("categories"),
      path: "/dashboard/categories",
      Icon: LayoutDashboard,
    },
    {
      name: t("orders"),
      path: "/dashboard/orders",
      Icon: PackageOpen,
    },
  ];

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

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
                      pathname.includes(item.path)
                        ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                        : "text-color-2"
                    )}
                  >
                    <item.Icon size={24} />
                    {item.name}
                  </div>
                </Link>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <Link
                href="/dashboard/users"
                className={cn(
                  session?.user.role === "ADMIN" ? "block" : "hidden"
                )}
              >
                <div
                  className={cn(
                    "py-3 px-4 hover:bg-color-3/45 hover:text-color-2 flex gap-3 items-center",
                    pathname === "/dashboard/users"
                      ? "bg-color-3 text-color-2 hover:bg-color-3 hover:text-color-2"
                      : "text-color-2"
                  )}
                >
                  <Users size={24} />
                  {t("users")}
                </div>
              </Link>
            </SheetClose>
            <Link href="/" className="">
              <Button
                variant="outline"
                className={cn(
                  "w-full flex items-center justify-center gap-2",
                  locale === "en" ? "flex-row-reverse" : ""
                )}
              >
                {t("to_store")}
                <ArrowLeftIcon size={15} />
              </Button>
            </Link>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className={cn(
                "w-full flex items-center justify-center gap-2 mt-2",
                locale === "en" ? "flex-row-reverse" : ""
              )}
            >
              {t("sign_out")}
              <ArrowLeft size={18} />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
