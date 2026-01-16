import { Button, Spinner } from "@heroui/react";
import { useGetTests } from "@/entities/user/tests/model/api/queries";
import { CircleQuestionMark, Clock } from "lucide-react";

export const Tests = () => {
  const { data: tests, isPending } = useGetTests();

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="font-bold text-2xl md:text-4xl text-center">
        Сиз үчүн тесттер
      </h2>

      <div className="mt-14 flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap md:items-stretch gap-8 relative before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-indigo-100 before:blur-2xl before:opacity-80">
        <div className="bg-white rounded-3xl max-w-86.5 p-4 md:basis-[calc(50%-1rem)] lg:basis-0 lg:flex-1">
          <h3 className="font-semibold text-xl md:text-2xl">
            Психологиялык-эмоционалдык диагностика
          </h3>

          <p className="font-medium text-neutral-500 mt-2">
            Тестти баштоо үчүн тынч жерге жайгашыңыз. Ортодон токтотууга
            болбойт.
          </p>

          <div className="flex items-center gap-8 mt-6 font-medium">
            <div className="flex items-center gap-1">
              <Clock />
              <span>30 мүнөт</span>
            </div>

            <div className="flex items-center gap-1">
              <CircleQuestionMark />
              <span>20 суроо</span>
            </div>
          </div>

          <p className="mt-6 font-medium text-neutral-500">
            Баасы:
            <span className="text-xl md:text-2xl text-blue-700"> 500с</span>
          </p>

          <Button className="bg-blue-700 mt-3 md:mt-6 rounded-xl w-full font-medium text-sm md:text-xl py-3.5 md:py-6">
            Оплатить
          </Button>
        </div>
      </div>
    </div>
  );
};
