import { CategoryGetAllItemResponseDto, UsersWithDetails } from '../types';

type InterviewsGetAllItemResponseDto = {
  id: number;
  interviewDate: string;
  status: string;
  interviewee: UsersWithDetails;
  interviewer: UsersWithDetails;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsGetAllItemResponseDto };
