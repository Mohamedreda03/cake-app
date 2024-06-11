import Image from "next/image";

export default function Services() {
  return (
    <div className="grid grid-cols-2 my-12 gap-x-3 gap-y-4">
      <div className="border rounded-xl px-5 py-8 flex flex-col items-center justify-center">
        <div className="p-2 bg-color-1 rounded-full">
          <Image
            src="/icons/truck.svg"
            width={50}
            height={50}
            alt="services"
            className="p-1"
          />
        </div>
        <h2 className="text-3xl text-center mt-4">توصيل سريع</h2>
      </div>
      <div className="border rounded-xl px-5 py-8 flex flex-col items-center justify-center">
        <div className="p-2 bg-color-1 rounded-full">
          <Image
            src="/icons/truck.svg"
            width={50}
            height={50}
            alt="services"
            className="p-1"
          />
        </div>
        <h2 className="text-3xl text-center mt-4">توصيل سريع</h2>
      </div>
      <div className="border rounded-xl px-5 py-8 flex flex-col items-center justify-center">
        <div className="p-2 bg-color-1 rounded-full">
          <Image
            src="/icons/truck.svg"
            width={50}
            height={50}
            alt="services"
            className="p-1"
          />
        </div>
        <h2 className="text-3xl text-center mt-4">توصيل سريع</h2>
      </div>
      <div className="border rounded-xl px-5 py-8 flex flex-col items-center justify-center">
        <div className="p-2 bg-color-1 rounded-full">
          <Image
            src="/icons/truck.svg"
            width={50}
            height={50}
            alt="services"
            className="p-1"
          />
        </div>
        <h2 className="text-3xl text-center mt-4">توصيل سريع</h2>
      </div>
    </div>
  );
}
