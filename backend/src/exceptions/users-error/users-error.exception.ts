import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class UsersError extends HttpError {
  public constructor({
    message = ExceptionMessage.INVALID_USER_REQUEST,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.USER_ERROR;
  }
}

export { UsersError };
