import { UsersGetResponseDto } from '../types';

type InterviewNoteGetAllItemResponseDto = {
  id: number;
  note: string;
  author: UsersGetResponseDto;
  createdAt: string;
};

export { type InterviewNoteGetAllItemResponseDto };
