import { db } from "@/lib/db";
import FormData from "./_components/FormData";
import { getTranslations } from "next-intl/server";

export default async function NewCategory({
  params,
}: {
  params: { locale: string };
}) {
  const categories = await db.category.findMany({
    include: {
      translation: {
        where: {
          language: params.locale,
        },
      },
    },
  });

  const t = await getTranslations("Dash_Products");
  return (
    <div>
      <div className="px-5 md:px-20 py-10 flex items-center justify-between">
        <h1 className="text-3xl font-medium border-b-2 border-color-1">
          {t("create_product")}
        </h1>
        <div></div>
      </div>
      <div>
        <FormData categories={categories as any} />
      </div>
    </div>
  );
}
