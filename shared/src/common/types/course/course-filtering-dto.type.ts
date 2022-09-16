import { EntityPaginationRequestQueryDto } from '~/common/types/pagination/entity-pagination-request-query-dto.type';

type CourseFilteringDto = {
  categoryKey: string;
  title: string;
} & EntityPaginationRequestQueryDto;

export { CourseFilteringDto };
