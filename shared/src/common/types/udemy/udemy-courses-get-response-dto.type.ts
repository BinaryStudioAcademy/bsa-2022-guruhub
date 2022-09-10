import { UdemyCourseGetResponseDto } from './udemy-course-get-response-dto.type';

type UdemyCoursesGetResponseDto = {
  count: number;
  results: UdemyCourseGetResponseDto[];
};

export { type UdemyCoursesGetResponseDto };
