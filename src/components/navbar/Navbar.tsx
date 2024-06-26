import Image from "next/image";
import CartCounter from "../CartCounter";
import Link from "next/link";

import ClientMobileMenu from "../ClientMobileMenu";

export default function Navbar() {
  return (
    <div className="w-full px-5 md:px-7 max-w-screen-xl mx-auto h-[80px] border-b border-color-4/35 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <ClientMobileMenu />
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={150} height={150} />
        </Link>
      </div>
      <div className="md:flex items-center gap-4 hidden">
        <Link
          href="/"
          className="relative before:block before:absolute before:bg-color-1 before:h-[2px] before:w-[0%] before:-left-2 hover:before:w-[100%] before:transition-all before:duration-300 before:ease-in-out before:bottom-0"
        >
          <p className="text-lg text-gray-900 mr-4">الرئيسية</p>
        </Link>
        <Link
          href="/menu"
          className="relative before:block before:absolute before:bg-color-1 before:h-[2px] before:w-[0%] before:-left-2 hover:before:w-[100%] before:transition-all before:duration-300 before:ease-in-out before:bottom-0"
        >
          <p className="text-lg text-gray-900 mr-4">القائمة</p>
        </Link>
        <Link
          href="/about"
          className="relative before:block before:absolute before:bg-color-1 before:h-[2px] before:w-[0%] before:-left-2 hover:before:w-[100%] before:transition-all before:duration-300 before:ease-in-out before:bottom-0"
        >
          <p className="text-lg text-gray-900 mr-4">قصتنا</p>
        </Link>
      </div>
      <CartCounter />
    </div>
  );
}
