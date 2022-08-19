type CourseModuleGetResponseDto = {
  id: number;
  title: string;
  description: string | null;
  moduleIndex: number;
  courseId: number;
};

export { type CourseModuleGetResponseDto };
