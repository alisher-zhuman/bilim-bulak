"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, cn } from "@heroui/react";
import { useRequireAuth } from "@/shared/lib/hooks/useRequireAuth";

type ConfirmContent = {
  warning: string;
  title: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  warnTitle: string;
  bullets: string[];
  readyTitle: string;
  yes: string;
  no: string;
  note: string;
  note2: string;
};

const Confirm = () => {
  const { ready, isAuthed } = useRequireAuth();
  const t = useTranslations("testConfirm");
  const router = useRouter();
  const { testId } = useParams<{ testId: string }>();
  const content = t.raw("content") as ConfirmContent;

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
        {/* <h1 className="font-bold text-2xl leading-tight">{content.title}</h1> */}

        <div className="h-5" />

        <div className="text-neutral-700 text-sm md:text-xl leading-relaxed space-y-4">
          {/* <p>{content.p1}</p> */}
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
          <p className="text-red-500 text-xl">{content.warning}</p>

          <h3 className="font-bold text-xl md:text-3xl">
            {content.readyTitle}
          </h3>

          <div className="mt-4 flex flex-row gap-3 justify-center">
            <Button
              onClick={onNo}
              className={cn(
                "rounded-xl bg-neutral-100 text-neutral-800 font-medium",
                "text-sm md:text-xl py-3.5 md:py-4.5 h-fit px-8",
              )}
            >
              {content.no}
            </Button>

            <Button
              onClick={onYes}
              isDisabled={!testId}
              className={cn(
                "rounded-xl bg-blue-700 text-white font-medium",
                "text-sm md:text-xl py-3.5 md:py-4.5 h-fit px-8",
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
