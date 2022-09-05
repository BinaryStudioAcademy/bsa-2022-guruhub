import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class InvalidFilesError extends HttpError {
  public constructor({
    message = ExceptionMessage.INVALID_FILE_TYPE,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.INVALID_FILE;
  }
}

export { InvalidFilesError };
