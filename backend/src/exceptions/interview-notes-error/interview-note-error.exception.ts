import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class InterviewNotesError extends HttpError {
  public constructor({
    message = ExceptionMessage.UNKNOWN_INTERVIEW_NOTE_AUTHOR,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.INTERVIEW_NOTE_ERROR;
  }
}

export { InterviewNotesError };
