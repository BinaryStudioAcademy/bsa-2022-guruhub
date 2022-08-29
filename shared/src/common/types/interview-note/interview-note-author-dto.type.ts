import { UserDetailsResponseDto } from '../types';

type InterviewNoteAuthor = {
  id: number;
  email: string;
  userDetails: UserDetailsResponseDto;
};

export { InterviewNoteAuthor };
