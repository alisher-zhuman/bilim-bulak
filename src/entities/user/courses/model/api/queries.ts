import { useQuery } from "@tanstack/react-query";
import { getCourses } from "./endpoints";

export const useGetCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });
};
