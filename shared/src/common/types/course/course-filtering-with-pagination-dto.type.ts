import { EntityPaginationRequestQueryDto } from '~/common/types/pagination/entity-pagination-request-query-dto.type';

type CourseFilteringWithPaginationDto = {
  categoryKey: string;
  title: string;
} & EntityPaginationRequestQueryDto;

export { CourseFilteringWithPaginationDto };
