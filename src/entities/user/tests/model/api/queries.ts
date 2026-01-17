import { useQuery } from "@tanstack/react-query";
import { getTestQuestions, getTests } from "./endpoints";

export const useGetTests = () => {
  return useQuery({
    queryKey: ["tests"],
    queryFn: () => getTests(),
  });
};

export const testKeys = {
  all: ["tests"],
  start: (testId: string) => [...testKeys.all, "start", testId],
};

export const useGetTest = (testId: string) => {
  return useQuery({
    queryKey: ["test", "start", testId],
    queryFn: () => getTestQuestions(testId),
    enabled: Boolean(testId),
  });
};
