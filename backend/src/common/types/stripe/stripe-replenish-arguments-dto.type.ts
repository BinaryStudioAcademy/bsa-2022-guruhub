import { BillingReplenishToken } from '../types';

type StripeReplenishArgumentsDto = {
  amount: number;
  token: BillingReplenishToken;
};

export { type StripeReplenishArgumentsDto };
