"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
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
} from "lucide-react";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Menu {
  name: string;
  path: string;
  Icon: LucideIcon;
}

const menu: Menu[] = [
  // {
  //   name: "الرأيسية",
  //   path: "/dashboard",
  //   Icon: Home,
  // },
  {
    name: "المنتجات",
    path: "/dashboard/products",
    Icon: Package2,
  },
  {
    name: "الفئات",
    path: "/dashboard/categories",
    Icon: LayoutDashboard,
  },
  {
    name: "الطلبات",
    path: "/dashboard/orders",
    Icon: PackageOpen,
  },
];

export default function MobileNavbar() {
  const { data: session } = useSession();

  const pathname = usePathname();

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
                  المستخدمين
                </div>
              </Link>
            </SheetClose>
            <Link href="/" className="">
              <Button variant="outline" className="w-full">
                الانتقال للمتجر
                <ArrowLeftIcon size={15} className="mr-1" />
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
