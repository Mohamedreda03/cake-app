import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex h-[500px] rounded-lg">
      <div className="flex flex-col justify-center items-center w-full text-white">
        <h1 className="text-4xl font-bold">Welcome to our store</h1>
        <p className="mt-4 text-lg">
          The best place to buy your favorite products
        </p>
        <button className="mt-4 bg-white text-black px-4 py-2 rounded-lg">
          Shop now
        </button>
      </div>
    </div>
  );
}
