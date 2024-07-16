import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";

export const metadata: Metadata = {
  title: "مصنع بيلا",
  description:
    "في بيلا يوجد لدينا فريق عمل متكامل يتميز بالكفاءة العالية والخبرة وتتوفر لدينا أفضل الأجهزة والأدوات حتى نخرج لعملائنا بأفضل المخرجات المميزة.",
};

export default function FactoryPage() {
  const t = useTranslations("Billa_Factory");

  return (
    <div className="max-w-screen-xl mx-auto p-5 md:p-7">
      <div className="flex items-center justify-center mt-5 mb-10">
        <h2 className="text-5xl border-b-2 border-color-1 w-fit">
          {t("title")}
        </h2>
      </div>
      <div
        className="text-xl min-h-[calc(60vh+8px)]"
        style={{
          wordSpacing: "3px",
        }}
      >
        <p className="text-2xl max-w-screen-md text-center mx-auto leading-10">
          {t("subtitle")}
        </p>
      </div>
    </div>
  );
}
