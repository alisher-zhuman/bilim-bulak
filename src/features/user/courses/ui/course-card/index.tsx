"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, cn } from "@heroui/react";
import { Calendar, SquarePlay } from "lucide-react";
import { CourseItem } from "@/entities/user/courses/model/types";
import { formatDateDDMMYYYY } from "@/shared/lib/utils/helpers";

interface Props {
  course: CourseItem;
}

export const CourseCard = ({ course }: Props) => {
  const router = useRouter();

  const t = useTranslations();

  const navigateToCourseDetail = () => {
    router.push(`/user/courses/${course.id}`);
  };

  return (
    <div className="bg-white rounded-3xl max-w-86.5 p-4 md:basis-[calc(50%-1rem)] lg:basis-0 lg:flex-1 h-full flex flex-col">
      <h3 className="font-semibold mt-2 text-xl md:text-2xl">{course.title}</h3>

      <p className="font-medium text-neutral-500 mt-2">{course.description}</p>

      <div className="flex flex-col gap-3 mt-6 font-medium">
        <div className="flex items-center gap-1">
          <SquarePlay size={20} />
          <span>
            {t("coursesPage.videosCount", { value: course.videosCount })}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar size={20} />
          <span>
            {t("coursesPage.openUntil", {
              date: formatDateDDMMYYYY(course.accessDeadline),
            })}
          </span>
        </div>
      </div>

      <div className="h-5" />

      <Button
        onClick={navigateToCourseDetail}
        className={cn(
          "mt-auto bg-blue-700 rounded-xl w-full font-medium flex items-center justify-center gap-2 text-sm md:text-xl py-3.5 md:py-6"
        )}
      >
        {t("coursesPage.openCourse")}
      </Button>
    </div>
  );
};
