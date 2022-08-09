import { HttpError } from '~/exceptions/exceptions';
import { CustomExceptionName } from '~/common/enums/enums';

type Constructor = {
  message?: string;
  status?: number;
};

class InvalidCredentialsError extends HttpError {
  constructor({ message, status }: Constructor = {}) {
    super({ message, status });
    this.name = CustomExceptionName.INVALID_CREDENTIALS;
  }
}

export { InvalidCredentialsError };
