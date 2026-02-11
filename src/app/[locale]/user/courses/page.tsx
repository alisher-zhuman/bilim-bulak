// app/user/courses/page.tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import { UserLayout } from "@/widgets/layout/user-layout";
import { useCheckTestHasCompleted } from "@/entities/user/tests/model/api/queries";
import { ErrorBlock } from "@/shared/ui/error-block";

type CourseItem = {
  key: "meditation" | "affirmations" | "lessons";
  title: string;
  text: string;
  action: string;
};

type CoursesContent = {
  title: string;
  p1: string;
  subTitle: string;
  items: CourseItem[];
  note: string;
  extraTitle: string;
  extraText: string;
  extraAction: string;
  locked: {
    title: string;
    text: string;
    action: string;
  };
};

const Courses = () => {
  const t = useTranslations("coursesPage");
  const locale = useLocale();
  const router = useRouter();
  const content = t.raw("content") as CoursesContent;

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
      ) : data?.hasCompletedAnyTest ? (
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
              {content.locked.title}
            </p>

            <p className="mt-2 text-neutral-600 text-sm md:text-xl">
              {content.locked.text}
            </p>

            <div className="h-4" />

            <Button
              onClick={() => router.push("/user/tests")}
              className="rounded-xl bg-blue-700 text-white font-medium text-sm md:text-lg h-fit px-5 py-2"
            >
              {content.locked.action}{" "}
              <MoveRight size={18} />
            </Button>
          </div>
        </section>
      )}
    </UserLayout>
  );
};

export default Courses;
