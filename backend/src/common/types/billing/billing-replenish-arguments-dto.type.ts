import { BillingReplenishToken } from './billing';

type BillingReplenishArgumentsDto = {
  userId: number;
  amountOfMoneyToReplenish: number;
  token: BillingReplenishToken;
};

export { type BillingReplenishArgumentsDto };
