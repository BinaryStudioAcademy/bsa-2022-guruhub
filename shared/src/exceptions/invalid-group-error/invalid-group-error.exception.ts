import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class InvalidGroupError extends Error {
  status: HttpCode;

  constructor({
    message = ExceptionMessage.INVALID_GROUP_NAME,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super(message);
    this.status = status;
    this.name = CustomExceptionName.INVALID_GROUP;
  }
}

export { InvalidGroupError };
