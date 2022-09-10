import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class MentorsError extends HttpError {
  public constructor({
    message = ExceptionMessage.ALREADY_HAVE_MENTOR_FOR_COURSE,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.MENTORS_ERROR;
  }
}

export { MentorsError };
