import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class CoursesModulesError extends HttpError {
  public constructor({
    message = ExceptionMessage.INVALID_COURSE_MODULE_FORMAT,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.INVALID_COURSE_MODULE;
  }
}

export { CoursesModulesError };
