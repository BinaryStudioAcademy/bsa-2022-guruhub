import { TaskStatus } from '~/common/enums/enums';

type TaskNoteManipulateRequestBodyDto = {
  note: string;
  status: TaskStatus;
};

export { type TaskNoteManipulateRequestBodyDto };
