import { EntityPaginationRequestQueryDto } from '~/common/types/types';

type InterviewsGetByUserIdRequestDto = {
  userId: number;
} & EntityPaginationRequestQueryDto;

export { type InterviewsGetByUserIdRequestDto };
