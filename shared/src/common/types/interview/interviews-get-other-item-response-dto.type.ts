import { InterviewStatus } from '~/common/enums/enums';

import { CategoryGetAllItemResponseDto, UsersWithDetails } from '../types';

type InterviewsGetOtherItemResponseDto = {
  id: number;
  interviewDate: string;
  status: InterviewStatus;
  interviewee: UsersWithDetails;
  interviewer: UsersWithDetails;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsGetOtherItemResponseDto };
