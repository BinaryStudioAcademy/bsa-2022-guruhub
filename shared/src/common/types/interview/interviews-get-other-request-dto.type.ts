import { EntityPaginationRequestQueryDto } from '../types';

type InterviewsGetOtherRequestDto = {
  interviewId: number;
} & EntityPaginationRequestQueryDto;

export { type InterviewsGetOtherRequestDto };
