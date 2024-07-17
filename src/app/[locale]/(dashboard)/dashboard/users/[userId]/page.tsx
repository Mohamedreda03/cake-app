import { db } from "@/lib/db";
import FormData from "./_components/FormData";
import Loading from "@/components/Loading";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function UserDetails({
  params,
}: {
  params: { userId: string; locale: string };
}) {
  const t = await getTranslations("User_Page");

  const user = await db.user.findFirst({
    where: {
      id: params.userId,
    },
  });

  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      <Link
        href="/dashboard/users"
        className="px-5 md:px-20 py-5 flex items-center gap-3"
      >
        <Button
          variant="secondary"
          className=" flex items-center gap-2"
          size="sm"
        >
          {params.locale === "ar" ? (
            <MoveRight size={18} />
          ) : (
            <MoveLeft size={18} />
          )}
          {t("go_back")}
        </Button>
      </Link>
      <FormData data={user} />
    </div>
  );
}
