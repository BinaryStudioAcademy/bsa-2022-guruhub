import { UsersGetResponseDto } from '../types';

type MenteesToMentorsResponseDto = {
  id: number;
  courseId: number;
  mentor: UsersGetResponseDto;
  menteeId: number;
};

export { type MenteesToMentorsResponseDto };
