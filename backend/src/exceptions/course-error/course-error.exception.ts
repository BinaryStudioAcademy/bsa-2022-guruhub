import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class CourseError extends HttpError {
  constructor({
    message = ExceptionMessage.INVALID_COURSE_CATEGORY,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.INVALID_COURSE;
  }
}

export { CourseError };
