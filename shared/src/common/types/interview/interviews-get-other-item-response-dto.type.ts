import { CategoryGetAllItemResponseDto, UsersWithDetails } from '../types';

type InterviewsGetOtherItemResponseDto = {
  id: number;
  interviewDate: string;
  status: string;
  interviewee: UsersWithDetails;
  interviewer: UsersWithDetails;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsGetOtherItemResponseDto };
