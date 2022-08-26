import { CategoryGetAllItemResponseDto, UsersGetResponseDto } from '../types';

type InterviewsByIdResponseDto = {
  id: number;
  interviewDate: string;
  status: string;
  interviewee: UsersGetResponseDto;
  interviewer: UsersGetResponseDto | null;
  courseCategory: CategoryGetAllItemResponseDto;
};

export { type InterviewsByIdResponseDto };
