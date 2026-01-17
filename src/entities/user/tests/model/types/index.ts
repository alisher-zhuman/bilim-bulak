export type TestStatus = "AVAILABLE" | "PAID" | "COMPLETED" | string;

export interface TestItem {
  id: number;
  title: string;
  description: string;
  timerMinutes: number;
  price: number;
  status: TestStatus;
  questionCount: number;
}

export type GetTestsResponse = TestItem[];
