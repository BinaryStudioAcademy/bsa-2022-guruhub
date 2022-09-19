import { CourseGetResponseDto, EntityPagination } from 'common/types/types';

type CourseOnThePageResponseDto = {
  results: EntityPagination<CourseGetResponseDto>;
  page: number;
};

export { type CourseOnThePageResponseDto };
