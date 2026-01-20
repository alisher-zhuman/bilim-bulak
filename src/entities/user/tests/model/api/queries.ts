import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkTestHasCompleted,
  getTestQuestions,
  getTestResult,
  getTests,
  submitTestAnswers,
} from "./endpoints";
import { SubmitTestPayload, TestResultResponse } from "../types";

export const useGetTests = () => {
  return useQuery({
    queryKey: ["tests"],
    queryFn: () => getTests(),
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export const useGetTest = (testId: string) => {
  return useQuery({
    queryKey: ["test", "start", testId],
    queryFn: () => getTestQuestions(testId),
    enabled: Boolean(testId),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useSubmitTestAnswers = () => {
  return useMutation<TestResultResponse, unknown, SubmitTestPayload>({
    mutationFn: (payload) => submitTestAnswers(payload),
  });
};

export const useGetTestResult = (testId: string) => {
  return useQuery({
    queryKey: ["test", "result", testId],
    queryFn: () => getTestResult(testId),
    enabled: Boolean(testId),
  });
};

export const useCheckTestHasCompleted = () => {
  return useQuery({
    queryKey: ["test", "has-completed"],
    queryFn: () => checkTestHasCompleted(),
  });
};
