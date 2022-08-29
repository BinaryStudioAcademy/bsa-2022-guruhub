import { InterviewNoteAuthor } from './interview-note-author-dto.type';

type InterviewNoteGetAllItemResponseDto = {
  id: number;
  note: string;
  author: InterviewNoteAuthor;
  createdAt: string;
};

export { type InterviewNoteGetAllItemResponseDto };
