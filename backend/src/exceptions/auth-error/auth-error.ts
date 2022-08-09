import { CustomExceptionName } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';

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
