import { api } from "@/shared/api";

export const getCourses = async () => {
  const { data } = await api.get("/user/courses");
  return data;
};
