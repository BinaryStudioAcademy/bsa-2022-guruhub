import { CustomExceptionName, ExceptionMessage } from '~/common/enums/enums';

class InvalidCredentialsError extends Error {
  public constructor(message = ExceptionMessage.BAD_CREDENTIALS) {
    super(message);
    this.name = CustomExceptionName.INVALID_CREDENTIALS;
  }
}

export { InvalidCredentialsError };
