import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class UdemyError extends HttpError {
  public constructor({
    message = ExceptionMessage.COURSE_NOT_FOUND,
    status = HttpCode.NOT_FOUND,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.INVALID_COURSE;
  }
}

export { UdemyError };
