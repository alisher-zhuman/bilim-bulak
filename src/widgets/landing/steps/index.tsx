import Image from "next/image";
import { STEPS } from "@/shared/utils/constants";

export const Steps = () => {
  return (
    <section className="max-w-400 m-auto px-5 my-14 md:my-20">
      <h1 className="text-center font-bold text-3xl md:text-5xl">
        Тесттен өтүү үчүн <br />
        <span className="text-blue-700">4 жөнөкөй кадам</span>
      </h1>

      <div className="mt-14 flex flex-col md:flex-row items-center gap-8 relative before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-indigo-100 before:blur-2xl before:opacity-80">
        {STEPS.map(({ icon, title, description }, i) => (
          <div
            key={i}
            className="p-4 md:p-6 bg-white rounded-3xl flex flex-col gap-5"
          >
            <div className="flex items-center justify-between">
              <p className="w-12 h-12 rounded-full font-bold bg-blue-700 text-white flex items-center justify-center">
                {i + 1}
              </p>

              <Image
                className="w-12 h-12 md:w-15 md:h-15"
                src={icon}
                alt={title}
                width={60}
                height={60}
              />
            </div>

            <h6 className="text-xl md:text-2xl font-semibold">{title}</h6>

            <p className="font-medium text-sm md:text-lg text-neutral-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
