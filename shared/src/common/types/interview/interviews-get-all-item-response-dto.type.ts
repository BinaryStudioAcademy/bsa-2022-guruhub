import { CategoryGetAllItemResponseDto, UsersGetResponseDto } from '../types';

type InterviewsGetAllItemResponseDto = {
  id: number;
  interviewDate: string;
  status: string;
  interviewee: UsersGetResponseDto;
  interviewer: UsersGetResponseDto;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsGetAllItemResponseDto };
