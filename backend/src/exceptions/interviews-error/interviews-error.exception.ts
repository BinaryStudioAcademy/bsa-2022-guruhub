import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class InterviewsError extends HttpError {
  public constructor({
    message = ExceptionMessage.INTERVIEW_EXIST,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.INTERVIEW_ERROR;
  }
}

export { InterviewsError };
