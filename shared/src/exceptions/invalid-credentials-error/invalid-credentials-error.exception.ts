import { CustomExceptionName, ExceptionMessage } from '~/common/enums/enums';

class InvalidCredentialsError extends Error {
  constructor(message = ExceptionMessage.INCORRECT_EMAIL) {
    super(message);
    this.name = CustomExceptionName.INVALID_CREDENTIALS;
  }
}

export { InvalidCredentialsError };
