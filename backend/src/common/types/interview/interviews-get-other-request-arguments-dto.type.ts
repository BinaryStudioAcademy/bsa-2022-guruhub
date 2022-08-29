import { EntityPaginationRequestQueryDto } from '~/common/types/types';

type InterviewsGetOtherRequestArgumentsDto = {
  intervieweeUserId: number;
  interviewId: number;
} & EntityPaginationRequestQueryDto;

export { type InterviewsGetOtherRequestArgumentsDto };
