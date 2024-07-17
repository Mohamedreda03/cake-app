import { Link } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import React from "react";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export default function LangButton({
  className,
  link,
}: {
  className?: string;
  link?: string;
}) {
  const locale = useLocale();
  return (
    <Link
      href={link ? link : "/"}
      locale={locale === "ar" ? "en" : "ar"}
      className={cn(className, locale === "en" ? "flex-row-reverse" : "")}
    >
      <Button variant="secondary" className="w-full">
        <Globe
          size={20}
          className={cn("text-gray-500", locale === "ar" ? "ml-2" : "mr-2")}
        />
        {locale === "ar" ? "English" : "Arabic"}
      </Button>
    </Link>
  );
}
