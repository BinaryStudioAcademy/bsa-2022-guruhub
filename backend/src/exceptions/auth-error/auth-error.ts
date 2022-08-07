import { HttpError } from '~/exceptions/exceptions';
import { CustomExceptionName, HttpCode } from '~/common/enums/enums';

type Constructor = {
  message?: string;
  status?: number;
};

class AuthError extends HttpError {
  constructor({
    message,
    status = HttpCode.INTERNAL_SERVER_ERROR,
  }: Constructor = {}) {
    super({ message, status });
    this.name = CustomExceptionName.AUTH_ERROR;
  }
}

export { AuthError };
