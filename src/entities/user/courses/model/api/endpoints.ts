import { api } from "@/shared/api";
import type { CourseDetailResponse, GetCoursesResponse } from "../types";

export const getCourses = async (): Promise<GetCoursesResponse> => {
  const { data } = await api.get<GetCoursesResponse>("/user/courses");
  return data;
};

export const getCourseDetail = async (
  courseId: string
): Promise<CourseDetailResponse> => {
  const { data } = await api.get<CourseDetailResponse>(
    `/user/courses/${courseId}`
  );
  return data;
};
