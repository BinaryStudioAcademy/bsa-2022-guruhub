import { UsersGetResponseDto } from '../types';

type InterviewNoteGetAllItemResponseDto = {
  id: number;
  note: string;
  author: UsersGetResponseDto;
};

export { type InterviewNoteGetAllItemResponseDto };
