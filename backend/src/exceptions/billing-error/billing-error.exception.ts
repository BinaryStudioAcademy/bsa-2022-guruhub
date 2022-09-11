import { HttpError } from 'guruhub-shared/exceptions/exceptions';

import { CustomExceptionName } from '~/common/enums/enums';

type Constructor = {
  message?: string;
  status?: number;
};

class BillingError extends HttpError {
  public constructor({ message, status }: Constructor = {}) {
    super({ message, status });
    this.name = CustomExceptionName.BILLING_ERROR;
  }
}

export { BillingError };
