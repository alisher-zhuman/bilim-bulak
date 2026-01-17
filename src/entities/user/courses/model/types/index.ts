export interface CourseItem {
  id: number;
  title: string;
  description: string;
  accessDeadline: string;
  videosCount: number;
}

export type GetCoursesResponse = CourseItem[];

export interface CourseVideoItem {
  id: number;
  courseId: number;
  title: string;
  url: string;
  displayOrder: number;
}

export interface CourseDetailResponse {
  title: string;
  videos: CourseVideoItem[];
}
