import { auth } from "@/auth";
import { Link } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import { Instagram } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import NextLink from "next/link";

export default async function Footer({ locale }: { locale: string }) {
  const session = await auth();
  const t = await getTranslations("Footer");
  const t2 = await getTranslations("Navigation");

  const links = [
    { href: "/", label: t2("home") },
    { href: "/menu", label: t2("menu") },
    { href: "/story", label: t2("story") },
    { href: "/factory", label: t2("Billa_Factory") },
    { href: "tel:0531458314", label: t2("Customer_Service") },
  ];

  return (
    <div className="bg-color-3">
      <footer>
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div
            className={cn(
              "grid grid-cols-1 gap-8 lg:grid-cols-3",
              locale === "ar" ? "grid-flow-dense" : ""
            )}
          >
            <div>
              <div className="text-teal-600 h-16 w-52 relative">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  fill
                  className="object-cover"
                />
              </div>

              <p className="mt-4 max-w-xs">{t("who_we_are_desc")}</p>

              <ul className="mt-8 flex gap-6">
                <li>
                  <NextLink
                    href="https://www.instagram.com/billa_sweet_?igsh=bnc4aDc5aWF4b3Vo"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="sr-only">Instagram</span>

                    <Image
                      src="/icons/instagram.svg"
                      width={30}
                      height={30}
                      alt="Instagram"
                      className="transition hover:opacity-75"
                    />
                  </NextLink>
                </li>

                <li>
                  <NextLink href="#" rel="noreferrer" target="_blank">
                    <span className="sr-only">Snapchat</span>

                    <Image
                      src="/icons/snapchat.svg"
                      width={30}
                      height={30}
                      alt="Snapchat"
                      className="transition hover:opacity-75"
                    />
                  </NextLink>
                </li>

                <li>
                  <NextLink
                    href="https://www.tiktok.com/@billa_sweet_?_r=1&_d=eeal58llfjf2ie&sec_uid=MS4wLjABAAAArfqMWeSF89uEwdNgMDW7o_PIlC9WA4V5gfLGx_VUgkqWMl7nHq3alnONSVkSCh_5&share_author_id=6943925937974002689&sharer_language=en&source=h5_m&u_code=ea1541d7540dm1&ug_btm=b6880,b5836&sec_user_id=MS4wLjABAAAAmGS534LdjwbZPnWeJxhgHVroKtbTDjO9IBieMUvGsR12NTippHqX8pBJ3nR8v3se&utm_source=copy&social_share_type=5&utm_campaign=client_share&utm_medium=ios&tt_from=copy&user_id=7276822581998650374&enable_checksum=1&share_link_id=B111B5C7-5FBB-4890-B701-6FB620C8645B&share_app_id=1233"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="sr-only">Tiktok</span>

                    <Image
                      src="/icons/tiktok.svg"
                      width={30}
                      height={30}
                      alt="Tiktok"
                      className="transition hover:opacity-75"
                    />
                  </NextLink>
                </li>

                <li>
                  <NextLink
                    href="https://linktr.ee/billa_sweet?fbclid=PAZXh0bgNhZW0CMTEAAaYqiXBs4bBxBfGvK7_qnMzn3JTzSvRe6yztcPKkE1yPDRIhgSlO3WNGAK8_aem_qomLGDcEpiKwFiRTxUjNpw"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="sr-only">linktree</span>

                    <Image
                      src="/icons/linktree.svg"
                      width={30}
                      height={30}
                      alt="linktree"
                      className="transition hover:opacity-75"
                    />
                  </NextLink>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
              <div>
                <p className="font-medium text-color-2">
                  {t("Customer_Service")}
                </p>

                <div className="mt-6 space-y-4">
                  {t("Customer_Service_Desc")}
                  <NextLink
                    href="tel:0531458314"
                    className="block border-b border-color-2 w-fit text-xl mt-2"
                  >
                    {t("Customer_Service")}: 0531458314
                  </NextLink>
                </div>
              </div>

              <div className={cn(locale === "ar" ? "lg:mr-5" : "lg:ml-5")}>
                <p className="font-medium text-color-2">{t("links")}</p>

                <ul className="mt-6 space-y-4 text-sm">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition hover:text-color-2 text-lg"
                      >
                        {" "}
                        {link.label}{" "}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()}. Billa Sweet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
