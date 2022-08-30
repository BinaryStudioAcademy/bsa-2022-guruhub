import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class TasksError extends HttpError {
  public constructor({
    message = ExceptionMessage.TASK_DOES_NOT_EXIST,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.TASKS_ERROR;
  }
}

export { TasksError };
