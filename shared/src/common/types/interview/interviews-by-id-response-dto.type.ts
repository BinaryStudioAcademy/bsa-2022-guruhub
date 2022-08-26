import { InterviewStatus } from '~/common/enums/enums';

import { CategoryGetAllItemResponseDto, UsersGetResponseDto } from '../types';

type InterviewsByIdResponseDto = {
  id: number;
  interviewDate: string;
  status: InterviewStatus;
  interviewee: UsersGetResponseDto;
  interviewer: UsersGetResponseDto;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsByIdResponseDto };
