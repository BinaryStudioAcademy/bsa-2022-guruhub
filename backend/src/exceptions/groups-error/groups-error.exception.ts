import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

class GroupsError extends HttpError {
  constructor({
    message = ExceptionMessage.INVALID_GROUP_NAME,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({ message, status });
    this.name = CustomExceptionName.INVALID_GROUP;
  }
}

export { GroupsError };
