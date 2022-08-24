import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class CoursesToMentorsError extends HttpError {
  public constructor({
    message = ExceptionMessage.ALREADY_MENTOR_FOR_COURSE,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.COURSES_TO_MENTORS_ERROR;
  }
}

export { CoursesToMentorsError };
