import { useTranslations } from "next-intl";
import FormData from "./_components/FormData";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";

export default async function NewCategory() {
  const t = await getTranslations("Dash_Categories");
  const session = await auth();

  if (!session?.user || session?.user.role === "USER") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return (
    <div>
      <div className="px-5 md:px-20 py-10 flex items-center justify-between">
        <h1 className="text-3xl font-medium border-b-2 border-color-1">
          {t("create_category")}
        </h1>
        <div></div>
      </div>
      <div>
        <FormData />
      </div>
    </div>
  );
}
