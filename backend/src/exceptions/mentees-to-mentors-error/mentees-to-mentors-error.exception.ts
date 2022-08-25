import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class MenteesToMentorsError extends HttpError {
  public constructor({
    message = ExceptionMessage.ALREADY_MENTEE_FOR_COURSE,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.MENTEES_TO_MENTORS_ERROR;
  }
}

export { MenteesToMentorsError };
