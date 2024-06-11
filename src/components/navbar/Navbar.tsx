import Image from "next/image";
import CartCounter from "../CartCounter";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full px-7 max-w-screen-xl mx-auto h-[80px] border-b border-color-4/35 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={150} height={150} />
        </Link>

        <Link href="/menu">
          <p className="text-lg text-gray-900 mr-4">القائمة</p>
        </Link>
      </div>
      <CartCounter />
    </div>
  );
}
