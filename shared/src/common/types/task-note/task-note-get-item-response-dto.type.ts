import { TaskStatus } from '~/common/enums/enums';

import { UsersGetResponseDto } from '../types';

type TaskNoteGetItemResponseDto = {
  id: number;
  author: UsersGetResponseDto;
  note: string;
  createdAt: string;
  status: TaskStatus;
};

export { type TaskNoteGetItemResponseDto };
