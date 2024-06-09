import Image from "next/image";
import React from "react";
import MobileNavbar from "./MobileNavbar";

export default function DashboardNavbar() {
  return (
    <div className="md:pr-56">
      <div className="bg-color-3/40 w-full h-[60px] border-b border-color-3">
        <div className="px-5 flex items-center justify-between">
          <div>
            <MobileNavbar />
          </div>
          <div>
            <Image src="/logo-head.png" width={100} height={50} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
