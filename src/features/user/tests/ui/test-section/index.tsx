"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetTest } from "@/entities/user/tests/model/api/queries";
import { ErrorBlock } from "@/shared/ui/error-block";
import { Button, Modal, Spinner } from "@heroui/react";
import { CircleX } from "lucide-react";

export const TestSection = () => {
  const { testId } = useParams<{ testId: string }>();

  const { data: test, isPending, isError, refetch } = useGetTest(testId);

  const router = useRouter();

  console.log(test);

  const safeTotal = Math.max(1, test?.questionCount ?? 0);
  const percent = Math.min(100, Math.max(0, (5 / safeTotal) * 100));

  const navigateToTests = () => {
    router.replace("/user/tests");
  };

  return (
    <>
      <div className="w-full flex justify-end max-w-400 m-auto py-5 px-5">
        <button
          onClick={navigateToTests}
          className="flex items-center gap-2 font-medium text-sm md:text-xl text-red-500 cursor-pointer"
        >
          Тестти аяктоо <CircleX color="#fb2c36" />
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

            <div>
              <h2 className="font-semibold text-base md:text-3xl mt-5 md:mt-10 text-center">
                Себепсиз тынчсызданам
              </h2>
            </div>
          </div>
        </div>
      )}

      <Modal>
        <Modal.Backdrop variant="blur">
          <Modal.Container placement="center">
            <Modal.Dialog className="rounded-3xl">
              <Modal.CloseTrigger />

              <Modal.Body style={{ color: "black" }}>
                <h3 className="font-bold text-xl text-black! md:text-2xl">
                  Вы точно хотите завершить тест?
                </h3>

                <p>Если вы завершите ваши ответы не сохраняться.</p>

                <div className="mt-6 flex flex-col gap-2">
                  <Button className="w-full rounded-xl bg-blue-700 text-white font-medium text-sm md:text-xl py-3.5 md:py-4.5 h-fit">
                    Завершить
                  </Button>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};
