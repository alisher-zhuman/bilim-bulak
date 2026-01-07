import Image from "next/image";

export const Logo = () => (
  <Image
    src="/icons/logo.svg"
    alt="Logo"
    loading="eager"
    width={112}
    height={60}
  />
);
