import { db } from "@/lib/db";
import FormData from "./_components/FormData";
import Loading from "@/components/Loading";
import { Link } from "@/hooks/navigation";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function ProductDetails({
  params,
}: {
  params: { productId: string; locale: string };
}) {
  const t = await getTranslations("Dash_Products");
  const product = await db.product.findFirst({
    where: {
      id: params.productId,
    },
    include: {
      translation: true,
    },
  });

  const categories = await db.category.findMany({
    include: {
      translation: {
        where: {
          language: params.locale,
        },
      },
    },
  });

  if (!product) {
    return <Loading />;
  }

  return (
    <div>
      <Link
        href="/dashboard/products"
        className="px-5 md:px-20 py-5 flex items-center gap-3"
      >
        <Button
          variant="secondary"
          className="flex items-center gap-3"
          size="sm"
        >
          {params.locale === "en" ? (
            <MoveLeft size={18} />
          ) : (
            <MoveRight size={18} />
          )}

          {t("go_back")}
        </Button>
      </Link>
      <FormData data={product} categories={categories} />
    </div>
  );
}
