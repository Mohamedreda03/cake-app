import Image from "next/image";
import CartCounter from "../CartCounter";

import ClientMobileMenu from "../ClientMobileMenu";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import { auth, signOut } from "@/auth";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import LangButton from "../LangButton";
import SignOutButton from "../SignOutButton";

export default async function Navbar() {
  const t = await getTranslations("Navigation");
  const session = await auth();
  const locale = await getLocale();

  const links = [
    { href: "/", label: t("home") },
    { href: "/menu", label: t("menu") },
    { href: "/story", label: t("story") },
    { href: "/factory", label: t("Billa_Factory") },
    { href: "/orders", label: t("orders") },
  ];
  return (
    <div className="w-full px-5 md:px-7 max-w-screen-xl mx-auto h-[80px] border-b border-color-4/35 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <ClientMobileMenu />
        <Link href="/" className="relative h-[70px] w-[150px]">
          <Image src="/logo.svg" alt="logo" fill />
        </Link>
      </div>
      <div className="md:flex items-center gap-4 hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative before:block before:absolute before:bg-color-1 before:h-[2px] before:w-[0%] before:-left-2 hover:before:w-[100%] before:transition-all before:duration-300 before:ease-in-out before:bottom-0",
              {
                hidden: link.href === "/orders" && !session?.user,
              }
            )}
          >
            <p className="text-lg text-gray-900 mr-4">{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-end gap-7 min-w-[150px]">
        {session?.user && session?.user.role !== "USER" && (
          <Link
            href={
              session.user.role === "ADMIN"
                ? "/dashboard/products"
                : "/dashboard/orders"
            }
            className="hidden md:block"
          >
            <Button
              variant="outline"
              className={cn(locale === "en" ? "flex flex-row-reverse" : "")}
            >
              {t("dashboard")}
              <ArrowLeftIcon size={15} className="mr-1" />
            </Button>
          </Link>
        )}
        <SignOutButton />

        <LangButton className="md:flex items-center hidden" />
        {!session?.user && (
          <Link href="/sign-in" className="hidden md:block">
            <Button variant="outline">{t("sign-in")}</Button>
          </Link>
        )}
        <CartCounter />
      </div>
    </div>
  );
}
