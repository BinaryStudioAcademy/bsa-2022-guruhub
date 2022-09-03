import { TaskStatus } from '~/common/enums/enums';

type TaskManipulateRequestArgumentsDto = {
  taskId: number;
  note: string;
  authorId: number;
  status: TaskStatus;
};

export { type TaskManipulateRequestArgumentsDto };
