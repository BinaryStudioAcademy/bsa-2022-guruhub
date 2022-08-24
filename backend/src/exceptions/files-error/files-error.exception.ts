import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

type Constructor = {
  message?: ExceptionMessage;
  status?: HttpCode;
};

class FilesError extends HttpError {
  public constructor({
    message = ExceptionMessage.STORAGE_NOT_FOUND,
    status = HttpCode.NOT_FOUND,
  }: Constructor = {}) {
    super({ message, status });
    this.name = CustomExceptionName.STORAGE_ERROR;
  }
}

export { FilesError };
