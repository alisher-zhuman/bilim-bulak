import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { MoveRight } from "lucide-react";

export const Intro = () => {
  const t = useTranslations();

  return (
    <section className="max-w-400 m-auto px-5 flex flex-col items-center justify-center mt-8 md:mt-20">
      <h1 className="font-bold text-3xl md:text-5xl text-center">
        {t("Педагогдорду психологиялык")} <br /> {t("колдоо долбоору")}
      </h1>

      <p className="text-center text-balance mt-3 text-sm md:text-xl font-medium text-neutral-500">
        {t("Билгирим академиясы Билим берүү министрлигинин колдоосу")}
        <br className="hidden md:inline-block" /> {t("менен")}
        <span className="text-blue-700"> «Билим Булак» </span>
        {t("долбоорунун алкагында мектеп жана бала бакча")}{" "}
        <br className="hidden md:inline-block" />
        {t("педагогдорун психология-логопедия багытында тестирлөөдөн өткөрөт")}.
      </p>

      <Button className="bg-blue-700 flex items-center gap-2 mt-10 rounded-xl font-medium text-sm md:text-xl py-3 px-4 md:py-4 md:px-5 h-fit w-fit">
        {t("Тесттен өтүү")} <MoveRight size={24} />
      </Button>

      <Image
        className="mt-3"
        src="/images/intro.webp"
        alt="Intro"
        width={750}
        height={500}
      />
    </section>
  );
};
