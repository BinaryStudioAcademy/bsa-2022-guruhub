import { HttpError } from 'guruhub-shared';
import { CustomExceptionName } from 'guruhub-shared/common/enums/exceptions/custom-exception-name.enum';
import { HttpCode } from '~/common/enums/enums';

class UserError extends HttpError {
  constructor(message: string) {
    super();
    this.name = CustomExceptionName.BAD_CREDENTIALS;
    this.message = message;
    this.status = HttpCode.BAD_REQUEST;
  }
}

export { UserError };
