import { useQuery } from "@tanstack/react-query";
import { getCourseDetail, getCourses } from "./endpoints";

export const useGetCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });
};

export const useGetCourseDetail = (courseId: string) => {
  return useQuery({
    queryKey: ["course-detail", courseId],
    queryFn: () => getCourseDetail(courseId),
    enabled: Boolean(courseId),
  });
};
