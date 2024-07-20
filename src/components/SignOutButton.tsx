"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SignOutButton() {
  const { data: session } = useSession();
  const t = useTranslations("Navigation");
  return (
    <>
      {session?.user.role === "USER" && (
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="hidden md:block"
        >
          {t("sign-out")}
          <ArrowLeftIcon size={15} className="mr-1" />
        </Button>
      )}
    </>
  );
}
