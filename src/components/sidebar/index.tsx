"use client";

import { Session } from "next-auth";
import Image from "next/image";
import MenuLinks from "./MenuLinks";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import LangButton from "../LangButton";

export default function Sidebar({ session }: { session: Session }) {
  const t = useTranslations("Dash_sidebar");
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  const locale = useLocale();

  return (
    <div
      className={cn(
        "hidden md:flex flex-col md:fixed inset-y-0 bg-color-3/40 w-56 h-full border-color-3 py-8",
        locale === "ar" && "right-0 border-l",
        locale === "en" && "left-0 border-r"
      )}
    >
      <div>
        <div>
          <Image src="/logo-head.png" width={200} height={50} alt="" />
        </div>
        <MenuLinks session={session} />
      </div>
      <div
        className={
          "mt-auto mb-2 flex flex-col items-center justify-center gap-3"
        }
      >
        <LangButton className="flex items-center" link="/dashboard/products" />
        <Button
          onClick={handleSignOut}
          variant="outline"
          className={cn("mx-auto", locale === "en" && "flex-row-reverse")}
        >
          {t("sign_out")}
          <ArrowLeft size={18} className="mr-2" />
        </Button>
      </div>
    </div>
  );
}
