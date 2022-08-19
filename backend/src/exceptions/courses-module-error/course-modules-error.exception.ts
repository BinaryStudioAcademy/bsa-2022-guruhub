import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class CoursesModulesError extends HttpError {
  public constructor({
    message = ExceptionMessage.UDEMY_SERVER_RETURNED_AN_INVALID_RESPONSE,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.COURSE_MODULE_ERROR;
  }
}

export { CoursesModulesError };
