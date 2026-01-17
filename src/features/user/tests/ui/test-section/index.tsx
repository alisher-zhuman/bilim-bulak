"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Spinner } from "@heroui/react";
import { CircleX } from "lucide-react";
import { useGetTest } from "@/entities/user/tests/model/api/queries";
import { ErrorBlock } from "@/shared/ui/error-block";
import { TestQuestion } from "../test-question";
import { TestFinishModal } from "../test-finish-modal";

export const TestSection = () => {
  const t = useTranslations();

  const router = useRouter();

  const { testId } = useParams<{ testId: string }>();

  const { data: test, isPending, isError, refetch } = useGetTest(testId);

  const [isFinishOpen, setIsFinishOpen] = useState(false);

  const safeTotal = Math.max(1, test?.questionCount ?? 0);
  const percent = Math.min(100, Math.max(0, (5 / safeTotal) * 100));

  const openFinishModal = () => setIsFinishOpen(true);
  const closeFinishModal = () => setIsFinishOpen(false);

  const confirmFinish = () => {
    setIsFinishOpen(false);
    router.replace("/user/tests");
  };

  return (
    <>
      <div className="w-full flex justify-end max-w-400 m-auto py-5 px-5">
        <button
          type="button"
          onClick={openFinishModal}
          className="flex items-center gap-2 font-medium text-sm md:text-xl text-red-500 cursor-pointer"
        >
          {t("tests.finishTest")}
          <CircleX color="#fb2c36" />
        </button>
      </div>

      {isPending ? (
        <div className="mt-14 flex items-center justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorBlock refetch={refetch} className="mt-14" />
      ) : (
        <div className="max-w-400 min-h-screen m-auto flex justify-center">
          <div
            style={{ width: 472, padding: "0px 20px" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-neutral-500 font-medium text-sm md:text-xl">
              {test?.title}
            </h1>

            <div className="mt-3 md:mt-6 h-3 w-full rounded-full bg-[#F5F5F5] overflow-hidden">
              <div
                className="rounded-full bg-blue-700 h-3 transition-[width] duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="flex items-center justify-between w-full mt-3 md:mt-6">
              <p className="text-sm md:text-2xl font-semibold text-blue-700">
                8 / 20
              </p>

              <p className="text-2xl md:text-4xl font-semibold text-green-500">
                14:39
              </p>
            </div>

            <TestQuestion />

            <div className="h-5" />

            <Button className="w-full rounded-xl bg-blue-700 text-white font-medium text-sm md:text-xl py-3.5 md:py-4.5 h-fit">
              {t("signUpForm.continue")}
            </Button>
          </div>
        </div>
      )}

      <TestFinishModal
        isOpen={isFinishOpen}
        onOpenChange={setIsFinishOpen}
        onConfirm={confirmFinish}
        onCancel={closeFinishModal}
      />
    </>
  );
};
