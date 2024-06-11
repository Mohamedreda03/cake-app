import Image from "next/image";

export default function Hero() {
  return (
    <div
      className="relative flex flex-col h-[600px] justify-center items-center w-full text-white"
      style={{
        backgroundImage: "url('/hero-4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-color-2/50 to-color-1/50"></div>
      <div
        style={{ position: "relative", zIndex: 1 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="relative">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={200}
            quality={100}
          />
          <div className="absolute bottom-[35%] w-full h-10 bg-color-2 -z-10"></div>
        </div>
        <h1 className="text-5xl">النص الخاص بك هنا</h1>
        <p>نص إضافي هنا</p>
      </div>
    </div>
  );
}
