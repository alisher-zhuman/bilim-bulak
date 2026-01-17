import { api } from "@/shared/api";
import { GetTestsResponse, TestStartResponse } from "../types";

export const getTests = async (): Promise<GetTestsResponse> => {
  const { data } = await api.get<GetTestsResponse>("/user/tests");
  return data;
};

export const getTestQuestions = async (
  testId: string
): Promise<TestStartResponse> => {
  const { data } = await api.get<TestStartResponse>(
    `/user/tests/${testId}/start`
  );
  return data;
};
