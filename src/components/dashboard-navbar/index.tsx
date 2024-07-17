import Image from "next/image";
import React from "react";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function DashboardNavbar() {
  const locale = useLocale();
  const t = useTranslations("Dash_sidebar");

  return (
    <div className={locale === "ar" ? "md:pr-56" : "md:pl-56"}>
      <div className="bg-color-3/40 w-full h-[60px] border-b border-color-3">
        <div className="px-5 flex items-center justify-between">
          <div>
            <MobileNavbar />

            <Link href="/" className="hidden md:block">
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
          </div>
          <div>
            <Image src="/logo-head.png" width={100} height={50} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
