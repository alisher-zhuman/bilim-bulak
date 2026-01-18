import { api } from "@/shared/api";
import {
  GetTestsResponse,
  SubmitTestPayload,
  TestResultResponse,
  TestStartResponse,
} from "../types";
import { readTestStart, writeTestStart } from "../storage";

export const getTests = async (): Promise<GetTestsResponse> => {
  const { data } = await api.get<GetTestsResponse>("/user/tests");
  return data;
};

export const getTestQuestions = async (
  testId: string
): Promise<TestStartResponse> => {
  const cached = readTestStart(testId);
  if (cached) return cached;

  const { data } = await api.get<TestStartResponse>(
    `/user/tests/${testId}/start`
  );
  writeTestStart(testId, data);
  return data;
};

export const submitTestAnswers = async (
  payload: SubmitTestPayload
): Promise<TestResultResponse> => {
  const { data } = await api.post<TestResultResponse>(
    "/user/tests/submit",
    payload
  );
  return data;
};

export const getTestResult = async (
  testId: string
): Promise<TestResultResponse> => {
  const { data } = await api.get<TestResultResponse>(
    `/user/tests/${testId}/result`
  );
  return data;
};

export const checkTestHasCompleted = async (): Promise<{
  hasCompletedAnyTest: boolean;
}> => {
  const { data } = await api.get<{
    hasCompletedAnyTest: boolean;
  }>(`/user/tests/has-completed`);
  return data;
};
