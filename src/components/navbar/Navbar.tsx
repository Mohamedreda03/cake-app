import Image from "next/image";
import CartCounter from "../CartCounter";

import ClientMobileMenu from "../ClientMobileMenu";
import { useTranslations } from "next-intl";
import { Link } from "@/hooks/navigation";

export default function Navbar() {
  const t = useTranslations("Navigation");

  const links = [
    { href: "/", label: t("home") },
    { href: "/menu", label: t("menu") },
    { href: "/story", label: t("story") },
    { href: "/factory", label: t("Billa_Factory") },
  ];
  return (
    <div className="w-full px-5 md:px-7 max-w-screen-xl mx-auto h-[80px] border-b border-color-4/35 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <ClientMobileMenu />
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={150} height={150} />
        </Link>
      </div>
      <div className="md:flex items-center gap-4 hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative before:block before:absolute before:bg-color-1 before:h-[2px] before:w-[0%] before:-left-2 hover:before:w-[100%] before:transition-all before:duration-300 before:ease-in-out before:bottom-0"
          >
            <p className="text-lg text-gray-900 mr-4">{link.label}</p>
          </Link>
        ))}
      </div>
      <CartCounter />
    </div>
  );
}
