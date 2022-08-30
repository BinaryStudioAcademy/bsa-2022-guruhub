import { UsersGetResponseDto } from '../types';

type TaskNoteGetItemResponseDto = {
  id: number;
  author: UsersGetResponseDto;
  note: string;
};

export { type TaskNoteGetItemResponseDto };
