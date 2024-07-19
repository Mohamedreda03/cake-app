"use client";

import FormData from "./_components/FormData";
import Loading from "@/components/Loading";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

export default function CategoryDetails() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("Dash_Categories");
  const router = useRouter();
  const session = useSession();

  if (!session?.data?.user || session?.data?.user?.role === "USER") {
    router.push("/");
  }

  const { data: category } = useQuery({
    queryKey: ["categories", params.categoryId],
    queryFn: async () =>
      await axios.get(`/api/categories/${params.categoryId}`),
  });

  if (!category) {
    return <Loading />;
  }

  return (
    <div>
      <Link
        href="/dashboard/categories"
        className="px-5 md:px-20 py-5 flex items-center gap-3"
      >
        <Button
          variant="secondary"
          className=" flex items-center gap-3"
          size="sm"
        >
          {locale === "ar" ? <MoveRight size={18} /> : <MoveLeft size={18} />}

          {t("go_back")}
        </Button>
      </Link>
      <FormData data={category.data.data} />
    </div>
  );
}
