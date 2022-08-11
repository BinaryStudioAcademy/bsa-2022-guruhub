import { CustomExceptionName, ExceptionMessage } from '~/common/enums/enums';

class PermissionError extends Error {
  constructor(message = ExceptionMessage.PERMISSION_ERROR) {
    super(message);
    this.name = CustomExceptionName.PERMISSION_ERROR;
  }
}

export { PermissionError };
