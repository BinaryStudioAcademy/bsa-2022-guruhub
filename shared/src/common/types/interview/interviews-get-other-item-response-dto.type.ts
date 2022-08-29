import { InterviewStatus } from '~/common/enums/enums';

import { CategoryGetAllItemResponseDto, UserWithDetailsDto } from '../types';

type InterviewsGetOtherItemResponseDto = {
  id: number;
  interviewDate: string;
  status: InterviewStatus;
  interviewee: UserWithDetailsDto;
  interviewer: UserWithDetailsDto;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsGetOtherItemResponseDto };
