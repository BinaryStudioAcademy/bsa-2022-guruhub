import { InterviewStatus } from '~/common/enums/enums';

import { CategoryGetAllItemResponseDto, UserWithDetailsDto } from '../types';

type InterviewsByIdResponseDto = {
  id: number;
  interviewDate: string;
  status: InterviewStatus;
  interviewee: UserWithDetailsDto;
  interviewer: UserWithDetailsDto | null;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsByIdResponseDto };
