import { HttpError } from '~/exceptions/exceptions';
import { CustomExceptionName } from '~/common/enums/enums';

type Constructor = {
  message?: string;
  status?: number;
};

class AuthError extends HttpError {
  constructor({ message, status }: Constructor = {}) {
    super({ message, status });
    this.name = CustomExceptionName.AUTH_ERROR;
  }
}

export { AuthError };
