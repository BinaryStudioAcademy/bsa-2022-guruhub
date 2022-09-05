import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class UserDetailsError extends HttpError {
  public constructor({
    message = ExceptionMessage.USER_DETAILS_NOT_FOUND,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.USER_DETAILS_ERROR;
  }
}

export { UserDetailsError };
