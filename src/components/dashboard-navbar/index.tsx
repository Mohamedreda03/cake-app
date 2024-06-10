import Image from "next/image";
import React from "react";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <div className="md:pr-56">
      <div className="bg-color-3/40 w-full h-[60px] border-b border-color-3">
        <div className="px-5 flex items-center justify-between">
          <div>
            <MobileNavbar />
            <Link href="/">
              <Button variant="outline">
                الانتقال للمتجر
                <ArrowLeftIcon size={15} className="mr-1" />
              </Button>
            </Link>
          </div>
          <div>
            <Image src="/logo-head.png" width={100} height={50} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
