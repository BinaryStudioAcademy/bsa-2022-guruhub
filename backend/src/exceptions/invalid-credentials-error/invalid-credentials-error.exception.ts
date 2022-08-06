import { CustomExceptionName, ExceptionMessage } from '~/common/enums/enums';

class InvalidCredentials extends Error {
  constructor({ message = ExceptionMessage.EMAIL_ALREADY_EXISTS } = {}) {
    super(message);
    this.name = CustomExceptionName.INVALID_CREDENTIALS;
  }
}

export { InvalidCredentials };
