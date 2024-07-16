import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";

export const metadata: Metadata = {
  title: "story",
  description: `هي قصة شغف الأختين نورا ورنا ووالدتهما .. فبشكلها الانيق والمميز
          وطعمها الساحر وادراكهم بأن الحلويات اللذيذة هي سرّ السعادة في الحفلات
          والمناسبات والاجتماعات العائلية ابتسامه وتصنع السعادة للناس .. فقررو
          انشاء مشروعهم المنزلي الصغير.`,
};

export default function StoryPage() {
  const t = useTranslations("StoryPage");

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
        <p>{t("part1")}</p>
        <p className="mt-4">{t("part2")}</p>
        <p className="mt-4">{t("part3")}</p>
        <p className="mt-4">{t("part4")}</p>
        <p className="mt-4">{t("part5")}</p>
      </div>
    </div>
  );
}
