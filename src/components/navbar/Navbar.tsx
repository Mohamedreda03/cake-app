import Image from "next/image";
import CartCounter from "../CartCounter";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full h-[80px] border-b border-color-4/35 shadow-sm flex items-center justify-between px-5">
      <div>
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={150} height={150} />
        </Link>
      </div>
      <CartCounter />
    </div>
  );
}
