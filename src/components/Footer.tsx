import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  const session = await auth();
  return (
    <footer className="bg-color-3/60">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Image src="/logo.svg" alt="Logo" width={150} height={150} />
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <Link
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/"
            >
              {" "}
              الرئيسية{" "}
            </Link>
          </li>

          <li>
            <Link
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/menu"
            >
              {" "}
              القائمة{" "}
            </Link>
          </li>

          <li>
            <Link
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/about"
            >
              {" "}
              عنا{" "}
            </Link>
          </li>

          {!session?.user && (
            <li>
              <Link
                className="text-gray-700 transition hover:text-gray-700/75"
                href="/sign-in"
              >
                {" "}
                تسجيل الدخول{" "}
              </Link>
            </li>
          )}
        </ul>

        <ul className="mt-12 flex justify-center items-center gap-6 md:gap-8">
          <a href="https://www.instagram.com/billa_sweet_" target="_blank">
            <Image src="/icons/icons8-instagram.svg" alt="Instagram" width={32} height={32} />
          </a>
          <a href="https://twitter.com/billa_sweet_" target="_blank">
            <Image src="/icons/icons8-twitterx.svg" alt="twitter" width={30} height={30} />
          </a>
          <a href="https://www.snapchat.com/add/billa_sweet" target="_blank">
            <Image src="/icons/icons8-snapchat.svg" alt="snapchat" width={42} height={42} />
          </a>
          <a href="https://www.snapchat.com/add/billa_sweet" target="_blank">
            <Image src="/icons/icons8-tiktok.svg" alt="tiktok" width={35} height={35} />
          </a>

        </ul>
      </div>
    </footer>
  );
}
