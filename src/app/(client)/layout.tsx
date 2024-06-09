import Navbar from "@/components/navbar/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-color-3/20">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
