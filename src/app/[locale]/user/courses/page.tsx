// app/user/courses/page.tsx
"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import { UserLayout } from "@/widgets/layout/user-layout";
import { useCheckTestHasCompleted } from "@/entities/user/tests/model/api/queries";
import { ErrorBlock } from "@/shared/ui/error-block";

const Courses = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const content = useMemo(() => {
    const kg = {
      title: "Урматтуу эжеке-агайлар!",
      p1:
        "Биз сиздерге профессионалдуу жардам бере турган сабактар менен толук камсыз кылууга даярбыз. " +
        "Бул сабактардан алган билимиңизди теориялык жана практикалык жактан колдонуп, күнүмдүк ишиңизде натыйжалуулугун арттыра аласыз.",
      subTitle: "Сиздерге сунуш кыла турган маалыматтар үч бөлүктөн турат:",
      items: [
        {
          key: "meditation",
          title: "Медитация",
          text: "стресстин деңгээлин төмөндөтүүгө жардам берет, ички тынчтыкты жана концентрацияны күчөтөт.",
          action: "Окуу",
        },
        {
          key: "affirmations",
          title: "Аффирмациялар",
          text: "нерв системасын чындап бекемдейт, иммунитетти күчөтөт жана эмоционалдык туруктуулукту жогорулатат.",
          action: "Окуу",
        },
        {
          key: "lessons",
          title: "50 сабактан турган теориялык билим",
          text: "бул билим сизге иш жүзүндө бардык көндүмдөрдү колдонууну үйрөтөт.",
          action: "Окуу",
        },
      ],
      note: "Биздин максат – сиздерди ишенимдүү, күчтүү жана натыйжалуу адистер кылуу.",
      extraTitle: "Кошумча пайдалуу маалымат",
      extraText: "Видеону көрүү үчүн төмөнкү баскычты басыңыз.",
      extraAction: "Өтүү",
    };

    const ru = {
      title: "Уважаемые учителя!",
      p1:
        "Мы готовы предоставить вам профессиональные занятия, которые окажут практическую и теоретическую помощь. " +
        "Полученные знания вы сможете использовать как в теории, так и на практике, повышая эффективность своей работы.",
      subTitle: "Информация представлена в трёх ключевых блоках:",
      items: [
        {
          key: "meditation",
          title: "Медитация",
          text: "помогает снижать уровень стресса, улучшает концентрацию и внутреннее спокойствие.",
          action: "Читать",
        },
        {
          key: "affirmations",
          title: "Аффирмации",
          text: "укрепляют нервную систему, повышают иммунитет и эмоциональную устойчивость.",
          action: "Читать",
        },
        {
          key: "lessons",
          title: "50 теоретических уроков",
          text: "эти знания помогут применять полученные навыки на практике.",
          action: "Читать",
        },
      ],
      note: "Наша цель – сделать вас уверенными, сильными и эффективными профессионалами.",
      extraTitle: "Дополнительная полезная информация",
      extraText: "Нажмите кнопку ниже, чтобы посмотреть видео.",
      extraAction: "Перейти",
    };

    return locale === "ru" ? ru : kg;
  }, [locale, t]);

  const LESSONS_URL =
    locale === "ru"
      ? "https://drive.google.com/drive/folders/1XYKmaYACSOdTdlyELZJS0iJTXHciyidY?usp=sharing"
      : "https://drive.google.com/drive/folders/1PBoHEqJJ12EF-wzEts20whKWToIH4dc1?usp=sharing";

  const onOpen = (key: string) => {
    if (key === "meditation") {
      router.push("/user/courses/meditation");
      return;
    }

    if (key === "affirmations") {
      router.push("/user/courses/affirmations");
      return;
    }

    if (key === "lessons") {
      window.open(LESSONS_URL, "_blank", "noopener,noreferrer");
    }
  };

  const EXTRA_URL = "https://youtu.be/IOl8VkLD1-I?si=3Fn1lqS3a8cN2oNe";

  const onOpenExtra = () => {
    window.open(EXTRA_URL, "_blank", "noopener,noreferrer");
  };

  const { data, isPending, isError, refetch } = useCheckTestHasCompleted();

  return (
    <UserLayout>
      {isPending ? (
        <div className="mt-14 flex items-center justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorBlock refetch={refetch} className="mt-14" />
      ) : !data?.hasCompletedAnyTest ? (
        <section className="animate-fade-in max-w-400 m-auto">
          <h1 className="font-bold text-2xl md:text-4xl leading-tight">
            {content.title}
          </h1>

          <div className="h-4" />

          <p className="text-neutral-700 text-sm md:text-xl leading-relaxed">
            {content.p1}
          </p>

          <div className="h-6" />

          <div className="rounded-2xl bg-indigo-50 p-4 md:p-6">
            <h2 className="font-bold text-lg md:text-2xl text-neutral-900">
              {content.subTitle}
            </h2>

            <div className="mt-4 grid gap-3">
              {content.items.map((item, idx) => (
                <div
                  key={item.key}
                  className="bg-white rounded-2xl p-4 md:p-5 border border-indigo-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-xl md:text-2xl leading-none">
                      {idx === 0 ? "1️⃣" : idx === 1 ? "2️⃣" : "3️⃣"}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-3">
                        <div className="text-sm md:text-xl leading-relaxed">
                          <span className="font-semibold text-neutral-900">
                            {item.title}
                          </span>{" "}
                          –{" "}
                          <span className="text-neutral-700">{item.text}</span>
                        </div>

                        <Button
                          onClick={() => onOpen(item.key)}
                          className="rounded-xl bg-blue-700 text-white font-medium text-sm md:text-lg h-fit px-4 py-2"
                        >
                          {item.action} <MoveRight size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-5" />
            <p className="text-neutral-500 text-sm md:text-xl leading-relaxed">
              {content.note}
            </p>

            <div className="h-6" />
            <div className="bg-white rounded-2xl p-4 md:p-5 border border-indigo-100">
              <h3 className="font-bold text-lg md:text-2xl text-neutral-900">
                {content.extraTitle}
              </h3>

              <p className="mt-2 text-neutral-700 text-sm md:text-xl leading-relaxed">
                {content.extraText}
              </p>

              <div className="h-4" />

              <Button
                onClick={onOpenExtra}
                className="rounded-xl bg-blue-700 text-white font-medium text-sm md:text-lg h-fit px-4 py-2"
              >
                {content.extraAction} <MoveRight size={18} />
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="animate-fade-in max-w-400 m-auto px-5">
          <div className="mt-14 rounded-2xl bg-indigo-50 p-5 md:p-7 text-center">
            <p className="text-neutral-900 font-semibold text-lg md:text-2xl">
              {locale === "ru"
                ? "Сначала пройдите тест"
                : "Адегенде тесттен өтүңүз"}
            </p>

            <p className="mt-2 text-neutral-600 text-sm md:text-xl">
              {locale === "ru"
                ? "После прохождения теста вам откроются материалы."
                : "Тесттен өткөндөн кийин материалдар ачылат."}
            </p>

            <div className="h-4" />

            <Button
              onClick={() => router.push("/user/tests")}
              className="rounded-xl bg-blue-700 text-white font-medium text-sm md:text-lg h-fit px-5 py-2"
            >
              {locale === "ru" ? "К тестам" : "Тесттерге өтүү"}{" "}
              <MoveRight size={18} />
            </Button>
          </div>
        </section>
      )}
    </UserLayout>
  );
};

export default Courses;
