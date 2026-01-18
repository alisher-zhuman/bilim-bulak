"use client";

import { useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button, cn } from "@heroui/react";
import { useRequireAuth } from "@/shared/lib/hooks/useRequireAuth";

const Confirm = () => {
  const { ready, isAuthed } = useRequireAuth();
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const { testId } = useParams<{ testId: string }>();

  const content = useMemo(() => {
    const kg = {
      title:
        "Кыргыз Республикасынын Министрлер Кабинети тарабынан бала-бакча жана мектептерде эмгектенген педагогдор үчүн психологиялык тест",
      p1: "Кыргыз Республикасынын Министрлер Кабинети тарабынан бала-бакча жана мектептерде эмгектенген педагогдору үчүн психологиялык тестти «Билгирим» академиясы даярдады.",
      p2: "Бул тестирлөөнүн негизги максаты мугалимдердин психологиялык абалын жана стресс деңгээлин аныктоо.",
      p3: "Тесттин жообу толук кепилдик менен купуя болот — андыктан тестте жооп берип жатканда «жообум кандай болот?» деп тынчсызданып, туура эмес жооп берүүдөн алыс болбоңуз.",
      p4: "Ички сезимдериңизде кандай болуп жатса, ошону туура жана ачык айтып жооп бериңиз — бул сиз үчүн пайдалуу: чындап ички абалыңызды аныктайсыз.",

      warnTitle: "Маанилүү эскертүү!!!",
      bullets: [
        "Бул тест — медициналык диагноз эмес!",
        "Психиатриялык корутунду бербейт!",
        "Психолог/психотерапевтке кайрылуу керек болгон деңгээлди гана көрсөтөт.",
        "Тесттен сиз бир гана жолу өтө аласыз. Эгер тест учурунда телефонуңуз өчүп калса же интернет көйгөйү болсо — тестти кайрадан баштоого туура келет. Ошондуктан тест тапшырууга өзгөчө көңүл буруп, убакыт бөлүңүз.",
        "Тесттин жыйынтыгы сиздин ички абалыңыздагы тынчсыздануу жана стресс деңгээлин чыгарып берет. Тесттен өткөндөн кийин сайттагы пайдалуу маалыматтарды колдонсоңуз болот.",
        "Сайт сиз үчүн 1 ай кызмат кылат. Тест тапшыргандан кийин сөзсүз түрдө сайттагы керектүү маалыматтарды өзүңүзгө көчүрүп алыңыз, себеби 1 айдан кийин сайт жаңыланып, система сизди чыгарып коёт.",
      ],

      readyTitle: "Тест баштоого даярсызбы?",
      yes: "Ооба",
      no: "Жок",
      note: "Урматтуу эжеке-агайлар! Тестте туура же туура эмес деген жооп жок. Болгону өзүңүз туура деп эсептеген вариантты тандаңыз.",
      note2: "Тестте «Ооба», «Кээде», «Жок» деген жооптор болот.",
    };

    const ru = {
      title:
        "Психологический тест для педагогов детских садов и школ Кыргызской Республики",
      p1: "Министерство Кабинета Министров Кыргызской Республики совместно с Академией «Билгирим» подготовили психологическое тестирование для педагогов, работающих в детских садах и школах.",
      p2: "Основная цель тестирования — определить психологическое состояние и уровень стресса учителей.",
      p3: "Результаты теста полностью конфиденциальны — поэтому, отвечая на вопросы, не переживайте о том, «как это будет выглядеть», и не избегайте ответов, которые вам кажутся «неправильными».",
      p4: "Отвечайте честно так, как вы чувствуете внутри — это поможет точнее определить ваше реальное состояние и будет полезно прежде всего вам.",

      warnTitle: "Важное предупреждение!!!",
      bullets: [
        "Этот тест не является медицинским диагнозом.",
        "Не даёт психиатрического заключения.",
        "Показывает лишь уровень, при котором может понадобиться обращение к психологу/психотерапевту.",
        "Пройти тест можно только один раз. Если во время теста отключится телефон или возникнут проблемы с интернетом — тест придётся начинать заново. Просим выделить время и пройти тест внимательно.",
        "По итогам теста вы получите результат по уровню тревожности и стресса, а также сможете воспользоваться полезными материалами внутри сайта.",
        "Доступ к сайту предоставляется на 1 месяц. После прохождения теста обязательно сохраните полезную информацию себе, потому что через месяц сайт обновится, и система выйдет из аккаунта.",
      ],

      readyTitle: "Вы готовы начать тест?",
      yes: "Да",
      no: "Нет",
      note: "Уважаемые коллеги! В тесте нет «правильных» или «неправильных» ответов. Выбирайте тот вариант, который считаете верным для себя.",
      note2: "В тесте будут варианты ответов: «Да», «Иногда», «Нет».",
    };

    return locale === "ru" ? ru : kg;
  }, [locale, t]);

  if (!ready) return null;
  if (!isAuthed) return null;

  const onYes = () => {
    if (!testId) return;
    router.replace(`/user/tests/${testId}`);
  };

  const onNo = () => {
    router.back();
  };

  return (
    <section className="animate-fade-in max-w-400 m-auto">
      <div className="p-5">
        <h1 className="font-bold text-2xl leading-tight">{content.title}</h1>

        <div className="h-5" />

        <div className="text-neutral-700 text-sm md:text-xl leading-relaxed space-y-4">
          <p>{content.p1}</p>
          <p>{content.p2}</p>
          <p>{content.p3}</p>
          <p>{content.p4}</p>
        </div>

        <div className="h-6" />

        <div className="rounded-2xl bg-indigo-50 p-4 md:p-6">
          <h2 className="font-bold text-lg md:text-2xl text-neutral-900">
            {content.warnTitle}
          </h2>

          <ul className="mt-4 list-disc pl-5 space-y-2 text-neutral-700 text-sm md:text-xl leading-relaxed">
            {content.bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="h-6" />

        <div className="text-center">
          <h3 className="font-bold text-xl md:text-3xl">
            {content.readyTitle}
          </h3>

          <div className="mt-4 flex flex-row gap-3 justify-center">
            <Button
              onClick={onNo}
              className={cn(
                "rounded-xl bg-neutral-100 text-neutral-800 font-medium",
                "text-sm md:text-xl py-3.5 md:py-4.5 h-fit px-8"
              )}
            >
              {content.no}
            </Button>

            <Button
              onClick={onYes}
              isDisabled={!testId}
              className={cn(
                "rounded-xl bg-blue-700 text-white font-medium",
                "text-sm md:text-xl py-3.5 md:py-4.5 h-fit px-8"
              )}
            >
              {content.yes}
            </Button>
          </div>

          <div className="h-5" />

          <p className="text-neutral-500 text-sm md:text-xl">{content.note}</p>
          <p className="text-neutral-500 text-sm md:text-xl mt-2">
            {content.note2}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Confirm;
