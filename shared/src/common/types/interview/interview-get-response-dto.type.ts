import { CategoryGetAllItemResponseDto, UsersGetResponseDto } from '../types';

type InterviewResponseDto = {
  id: number;
  interviewDate: string;
  status: string;
  interviewee: UsersGetResponseDto;
  interviewer: UsersGetResponseDto;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewResponseDto };
