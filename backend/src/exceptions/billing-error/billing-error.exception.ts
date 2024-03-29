import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

type Constructor = {
  message?: string;
  status?: number;
  cause?: unknown;
};

class BillingError extends HttpError {
  public constructor({
    message = ExceptionMessage.UNABLE_TO_PERFORM_BILLING_OPERATION,
    status = HttpCode.BAD_REQUEST,
    cause,
  }: Constructor = {}) {
    super({ message, status, cause });
    this.name = CustomExceptionName.BILLING_ERROR;
  }
}

export { BillingError };
