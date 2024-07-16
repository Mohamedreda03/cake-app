import { auth } from "@/auth";
import DashboardNavbar from "@/components/dashboard-navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

import { Cairo } from "next/font/google";

const cairo = Cairo({
  weight: ["400", "700"],
  subsets: ["latin", "arabic"],
});

export default async function layout({
  children,
}: {
  children: React.ReactNode;
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
      <main className="md:pr-56">{children}</main>
    </>
  );
}
