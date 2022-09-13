import { PaymentCurrency } from '~/common/enums/enums';

import { BillingReplenishToken } from '../types';

type StripeReplenishArgumentsDto = {
  amount: number;
  token: BillingReplenishToken;
  currency: PaymentCurrency;
};

export { type StripeReplenishArgumentsDto };
