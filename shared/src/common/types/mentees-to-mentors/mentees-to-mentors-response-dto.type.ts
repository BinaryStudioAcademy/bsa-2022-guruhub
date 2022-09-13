import { MenteesToMentorsStatus } from '~/common/enums/enums';

import { UsersGetResponseDto } from '../types';

type MenteesToMentorsResponseDto = {
  id: number;
  courseId: number;
  mentor: UsersGetResponseDto;
  menteeId: number;
  status: MenteesToMentorsStatus;
};

export { type MenteesToMentorsResponseDto };
