import { TaskStatus } from '~/common/enums/enums';

type TaskNoteCreateArgumentsDto = {
  note: string;
  taskId: number;
  authorId: number;
  status: TaskStatus;
};

export { type TaskNoteCreateArgumentsDto };
