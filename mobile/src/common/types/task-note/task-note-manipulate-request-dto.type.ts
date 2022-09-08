import { TaskNoteManipulateRequestBodyDto } from '~/common/types/types';

type TaskNoteManipulateRequestDto = {
  taskId: number;
  body: TaskNoteManipulateRequestBodyDto;
};

export { type TaskNoteManipulateRequestDto };
