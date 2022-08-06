import { CustomExceptionName } from 'guruhub-shared/common/enums/exceptions/custom-exception-name.enum';

class BadCredentials extends Error {
  constructor(message: string) {
    super();
    this.name = CustomExceptionName.BAD_CREDENTIALS;
    this.message = message;
  }
}

export { BadCredentials };
