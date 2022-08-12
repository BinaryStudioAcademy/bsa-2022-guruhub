import { CustomExceptionName, ExceptionMessage } from '~/common/enums/enums';

class PermissionsError extends Error {
  constructor(message = ExceptionMessage.PERMISSIONS_ERROR) {
    super(message);
    this.name = CustomExceptionName.PERMISSION_ERROR;
  }
}

export { PermissionsError };
