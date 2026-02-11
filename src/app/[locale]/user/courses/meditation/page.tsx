// app/user/courses/meditation/page.tsx (или соответствующий путь)
"use client";

import { useTranslations } from "next-intl";
import { UserLayout } from "@/widgets/layout/user-layout";
import { BackButton } from "@/shared/ui/back-button";

interface Block {
  h: string;
  p?: string;
  ul?: string[];
  ol?: string[];
  note?: string;
}

const Meditation = () => {
  const t = useTranslations("meditationPage");
  const content = t.raw("content") as { title: string; blocks: Block[] };

  return (
    <UserLayout>
      <section className="animate-fade-in max-w-400 m-auto">
        <BackButton />

        <h1 className="font-bold mt-5 text-2xl md:text-4xl leading-tight">
          {content.title}
        </h1>

        <div className="h-6" />

        <div className="space-y-6 text-neutral-700 text-sm md:text-xl leading-relaxed">
          {content.blocks.map((b, idx) => (
            <div key={idx} className="rounded-2xl bg-indigo-50 p-4 md:p-6">
              <h2 className="font-bold text-lg md:text-2xl text-neutral-900">
                {b.h}
              </h2>

              {b.p ? <p className="mt-3">{b.p}</p> : null}

              {b.ul?.length ? (
                <ul className="mt-3 list-disc pl-5 space-y-1">
                  {b.ul.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              ) : null}

              {b.ol?.length ? (
                <ol className="mt-3 list-decimal pl-5 space-y-1">
                  {b.ol.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ol>
              ) : null}

              {b.note ? (
                <p className="mt-4 font-medium text-neutral-900">{b.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </UserLayout>
  );
};

export default Meditation;
