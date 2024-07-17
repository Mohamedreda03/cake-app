"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/hooks/navigation";
import {
  LucideIcon,
  LayoutDashboard,
  Package2,
  PackageOpen,
  Users,
  Home,
} from "lucide-react";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Menu {
  name: string;
  path: string;
  Icon: LucideIcon;
}

export default function MenuLinks({ session }: { session: Session }) {
  const pathname = usePathname();
  const t = useTranslations("Dash_sidebar");

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

  return (
    <div className="flex flex-col mt-5 text-color-2">
      {menu.map((item) => (
        <Link key={item.name} href={item.path}>
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
      ))}

      <Link
        href="/dashboard/users"
        className={cn(session.user.role === "ADMIN" ? "block" : "hidden")}
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
    </div>
  );
}
