"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import Image from "next/image";
import MenuLinks from "./MenuLinks";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar({ session }: { session: Session }) {
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };
  return (
    <div className="hidden md:flex flex-col md:fixed right-0 inset-y-0 bg-color-3/40 w-56 h-full border-l border-color-3 py-8">
      <div>
        <div>
          <Image src="/logo-head.png" width={200} height={50} alt="" />
        </div>
        <MenuLinks session={session} />
      </div>
      <div className="mt-auto mb-2 flex items-center justify-center">
        <Button onClick={handleSignOut} variant="outline" className="mx-auto">
          تسجيل الخروج
          <ArrowLeft size={18} className="mr-2" />
        </Button>
      </div>
    </div>
  );
}
