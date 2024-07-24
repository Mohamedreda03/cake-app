"use client";

import React from "react";
import ServiceModel from "./models/ServiceModel";
import { useTranslations } from "next-intl";
import { Link } from "@/hooks/navigation";

export default function Service() {
  const t = useTranslations("Footer");
  //   const t2 = useTranslations("Navigation");
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <ServiceModel
        title={t("Customer_Service")}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <li>
        <div
          //   href="tel:0531458314"
          onClick={() => setIsOpen(true)}
          className="transition hover:text-color-2 text-lg cursor-pointer"
        >
          {" "}
          {t("Customer_Service")}{" "}
        </div>
      </li>
    </>
  );
}
