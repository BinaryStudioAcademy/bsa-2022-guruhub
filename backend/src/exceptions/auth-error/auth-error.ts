import { HttpError } from '~/exceptions/exceptions';
import {
  CustomExceptionName,
  ValidationMessage,
  HttpCode,
} from '~/common/enums/enums';

class AuthError extends HttpError {
  constructor({
    message = ValidationMessage.EMAIL_ALREADY_EXISTS,
    status = HttpCode.INTERNAL_SERVER_ERROR,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.AUTH_ERROR;
  }
}

export { AuthError };
