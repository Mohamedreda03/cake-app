"use client";

import { Session } from "next-auth";
import Image from "next/image";
import MenuLinks from "./MenuLinks";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Sidebar({ session }: { session: Session }) {
  const t = useTranslations("Navigation");
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="hidden md:flex flex-col md:fixed right-0 inset-y-0 bg-color-3/40 w-56 h-full border-l border-color-3 py-8">
      <div>
        <div>
          <Image src="/logo-head.png" width={200} height={50} alt="" />
        </div>
        <MenuLinks session={session} />
      </div>
      <div className="mt-auto mb-2 flex flex-col items-center justify-center gap-3">
        <Button onClick={handleSignOut} variant="outline" className="mx-auto">
          {t("sign-out")}
          <ArrowLeft size={18} className="mr-2" />
        </Button>
      </div>
    </div>
  );
}
