import { BillingReplenishToken } from './billing-replenish-token.type';

type BillingReplenishParamsDto = {
  amountOfMoneyToReplenish: number;
  token: BillingReplenishToken;
};

export { type BillingReplenishParamsDto };
