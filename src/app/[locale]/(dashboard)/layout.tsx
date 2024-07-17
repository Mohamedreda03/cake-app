import { auth } from "@/auth";
import DashboardNavbar from "@/components/dashboard-navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

export default async function layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  if (session.user.role === "USER") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return (
    <>
      <Sidebar session={session} />
      <DashboardNavbar />
      <main className={locale === "ar" ? "md:pr-56" : "md:pl-56"}>
        {children}
      </main>
    </>
  );
}
