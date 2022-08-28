import { InterviewStatus } from '~/common/enums/enums';

import { CategoryGetAllItemResponseDto, UserWithDetailsDto } from '../types';

type InterviewsGetAllItemResponseDto = {
  id: number;
  interviewDate: string;
  status: InterviewStatus;
  interviewee: UserWithDetailsDto;
  interviewer: UserWithDetailsDto;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsGetAllItemResponseDto };
