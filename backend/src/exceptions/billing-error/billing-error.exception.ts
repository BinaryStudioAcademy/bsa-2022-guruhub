import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import {
  CustomExceptionName,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';

type Constructor = {
  message?: string;
  status?: number;
};

class BillingError extends HttpError {
  public constructor({
    message = ExceptionMessage.UNABLE_TO_PERFORM_BILLING_OPERATION,
    status = HttpCode.BAD_REQUEST,
  }: Constructor = {}) {
    super({ message, status });
    this.name = CustomExceptionName.BILLING_ERROR;
  }
}

export { BillingError };
