import { InterviewStatus } from '~/common/enums/enums';

import { CategoryGetAllItemResponseDto, UsersGetResponseDto } from '../types';

type InterviewsGetAllItemResponseDto = {
  id: number;
  interviewDate: string;
  status: InterviewStatus;
  interviewee: UsersGetResponseDto;
  interviewer: UsersGetResponseDto | null;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsGetAllItemResponseDto };
