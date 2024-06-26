import { Metadata } from "next";
import Image from "next/image";

export default function Hero() {
  return (
    <div
      className="relative flex flex-col h-[600px] justify-center items-center w-full text-white"
      style={{
        backgroundImage: "url('/hero-6.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-color-1/30 to-color-1/40"></div>
      <div
        style={{ position: "relative", zIndex: 1 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="relative">
          <Image
            src="/logo.svg"
            alt="بيلا سويت"
            width={200}
            height={200}
            quality={100}
          />
          <div className="absolute bottom-[35%] w-full h-16 bg-color-2 -z-10"></div>
        </div>
        <h1 className="text-5xl text-center">مرحبا بكم في بيلا</h1>
        <h2 className="text-lg max-w-[700px] text-center">
          بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة
          من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.
        </h2>
      </div>
    </div>
  );
}
