import { TestItem } from "@/shared/types";

export type GetTestsResponse = TestItem[];

export interface TestAnswerItem {
  id: number;
  text: string;
  score: number;
}

export interface TestQuestionItem {
  id: number;
  text: string;
  orderNumber: number;
  answers: TestAnswerItem[];
}

export interface TestStartResponse {
  id: number;
  title: string;
  description: string;
  timerMinutes: number;
  price: number;
  questions: TestQuestionItem[];
  questionCount: number;
  startedAt: string;
}
