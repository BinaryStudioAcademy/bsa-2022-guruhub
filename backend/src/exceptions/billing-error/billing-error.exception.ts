import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

type Constructor = {
  message?: string;
  status?: number;
  cause?: Error | undefined;
};

class BillingError extends HttpError {
  public constructor({
    message = ExceptionMessage.UNABLE_TO_PERFORM_BILLING_OPERATION,
    status = HttpCode.BAD_REQUEST,
    cause,
  }: Constructor = {}) {
    super({ message, status });
    this.name = CustomExceptionName.BILLING_ERROR;
    this.cause = cause;
  }
}

export { BillingError };
