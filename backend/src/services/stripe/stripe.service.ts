import StripeApi from 'stripe';

import { ExceptionMessage, PaymentCurrency } from '~/common/enums/enums';
import { StripeReplenishArgumentsDto } from '~/common/types/types';
import { BillingError } from '~/exceptions/exceptions';

const MINIMAL_SUM_OF_MONEY_TO_WITHDRAW = 1;

type Constructor = {
  secretKey: string;
  apiVersion: string;
};

class Stripe {
  #stripe: StripeApi;

  public constructor({ secretKey, apiVersion }: Constructor) {
    this.#stripe = new StripeApi(secretKey, {
      apiVersion: apiVersion as '2022-08-01',
    });
  }

  public initReplenish({
    amount,
    token,
  }: StripeReplenishArgumentsDto): Promise<StripeApi.Charge> {
    return this.#stripe.charges.create({
      source: token.id,
      amount,
      currency: PaymentCurrency.USD,
    });
  }

  public initWithdraw(
    amount: number,
    currency: PaymentCurrency = PaymentCurrency.USD,
  ): Promise<StripeApi.Response<StripeApi.Payout>> {
    if (amount < MINIMAL_SUM_OF_MONEY_TO_WITHDRAW) {
      throw new BillingError({
        message: ExceptionMessage.NOT_ENOUGH_FUNDS_TO_WITHDRAW,
      });
    }

    return this.#stripe.payouts.create({
      amount,
      currency,
    });
  }
}

export { Stripe };
