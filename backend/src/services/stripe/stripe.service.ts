import StripeApi from 'stripe';

import { PaymentCurrency, PaymentUnit } from '~/common/enums/enums';
import { StripeReplenishArgumentsDto } from '~/common/types/types';
import { BillingError } from '~/exceptions/exceptions';

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
    try {
      return this.#stripe.charges.create({
        source: token.id,
        amount: amount * PaymentUnit.CENTS_IN_ONE_DOLLAR,
        currency: PaymentCurrency.USD,
      });
    } catch (err: unknown) {
      this.throwError(err);
    }
  }

  public initWithdraw(
    amount: number,
    currency: PaymentCurrency = PaymentCurrency.USD,
  ): Promise<StripeApi.Response<StripeApi.Payout>> {
    try {
      return this.#stripe.payouts.create({
        amount: amount * PaymentUnit.CENTS_IN_ONE_DOLLAR,
        currency,
      });
    } catch (err: unknown) {
      this.throwError(err);
    }
  }

  private throwError(err: unknown): never {
    if (err instanceof StripeApi.errors.StripeError) {
      throw new BillingError({
        message: err.message,
        status: err.statusCode,
      });
    }
    throw new BillingError();
  }
}

export { Stripe };
