"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import Image from "next/image";
import MenuLinks from "./MenuLinks";

export default function Sidebar({ session }: { session: Session }) {
  return (
    <div className="hidden md:block md:fixed right-0 inset-y-0 bg-color-3/40 w-56 border-l border-color-3 py-8">
      <div>
        <Image src="/logo-head.png" width={200} height={50} alt="" />
      </div>
      <MenuLinks session={session} />
    </div>
  );
}
