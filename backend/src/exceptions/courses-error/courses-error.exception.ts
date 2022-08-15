import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class CoursesError extends HttpError {
  constructor({
    message = ExceptionMessage.INVALID_COURSE_VENDOR,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.INVALID_COURSE;
  }
}

export { CoursesError };
