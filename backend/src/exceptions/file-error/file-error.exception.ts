import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  message?: ExceptionMessage | string;
  status?: HttpCode | number;
};

class FileError extends HttpError {
  public constructor({
    message = ExceptionMessage.STORAGE_NOT_FOUND,
    status = HttpCode.NOT_FOUND,
  }: Constructor = {}) {
    super({ message, status });
    this.name = CustomExceptionName.STORAGE_ERROR;
  }
}

export { FileError };
