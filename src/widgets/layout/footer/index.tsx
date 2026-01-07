import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <>
      <hr className="mt-20 border-gray-100 border" />

      <footer className="max-w-400 m-auto px-5 py-10 border-b border-gray-100">
        <nav className="flex flex-col md:flex-row gap-4 md:gap-2 items-start justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Image src="/icons/moe.svg" alt="Logo" width={60} height={60} />
              <Image
                src="/icons/bilgirim.svg"
                alt="Logo"
                width={60}
                height={60}
              />
            </div>

            <p className="text-sm md:text-lg font-medium mt-4 md:w-100">
              Кыргыз Республикасынын Билим берүү, илим министрлигинин жана
              «Билгирим» академиясынын колдоосу менен ишке ашырылган расмий
              платформа.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            <li className="text-xl md:text-2xl font-semibold">Байланыш</li>

            <li className="text-xs md:text-base font-medium text-neutral-500">
              <Link
                href="https://wa.me/996999555170"
                target="_blank"
                className="flex items-center gap-2"
              >
                <MessageCircle className="text-green-500" /> +996 999 555 170
              </Link>
            </li>

            <li className="text-xs md:text-base font-medium text-neutral-500">
              <Link
                href="https://www.instagram.com/bilgirim.akademiya/"
                target="_blank"
                className="flex items-center gap-2"
              >
                <Instagram className="text-pink-600" /> bilgirim.akademiya
              </Link>
            </li>
          </ul>

          <ul className="flex flex-col gap-4">
            <li className="text-xl md:text-2xl font-semibold">Маалымат</li>

            <li className="text-xs md:text-base font-medium text-neutral-500">
              <Link href="/">Колдонуу эрежелери</Link>
            </li>

            <li className="text-xs md:text-base font-medium text-neutral-500">
              <Link href="/">Купуялуулук саясаты</Link>
            </li>
          </ul>
        </nav>
      </footer>

      <p className="text-center text-xs md:text-base py-5 text-gray-400">
        © 2026 Билим Булак. Бардык укуктар корголгон.
      </p>
    </>
  );
};
