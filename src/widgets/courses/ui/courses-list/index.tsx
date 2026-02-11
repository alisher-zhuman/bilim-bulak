"use client";
import { useTranslations } from "next-intl";
import { Spinner } from "@heroui/react";
import { useGetCourses } from "@/entities/user/courses/model/api/queries";
import { CourseCard } from "@/features/user/courses/ui/course-card";
import { ErrorBlock } from "@/shared/ui/error-block";

export const CoursesList = () => {
  const { data: courses, isPending, isError, refetch } = useGetCourses();
  const t = useTranslations("coursesList");

  return (
    <section className="animate-fade-in">
      <h1 className="font-bold text-2xl md:text-4xl text-center">
        {t("title")}
      </h1>

      {isPending ? (
        <div className="mt-14 flex items-center justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorBlock refetch={refetch} className="mt-14" />
      ) : (
        <div className="mt-14 flex flex-col justify-center items-center md:flex-row md:flex-wrap lg:flex-nowrap md:items-stretch gap-8 relative before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-indigo-100 before:blur-2xl before:opacity-80">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};
