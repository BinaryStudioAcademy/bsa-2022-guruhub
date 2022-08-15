import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class PermissionsError extends HttpError {
  constructor({
    message = ExceptionMessage.PERMISSION_LACK,
    status = HttpCode.FORBIDDEN,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.PERMISSION_ERROR;
  }
}

export { PermissionsError };
