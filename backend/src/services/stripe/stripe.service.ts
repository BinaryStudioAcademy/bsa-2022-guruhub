import StripeApi from 'stripe';

import {
  PaymentCurrency,
  PaymentMethod,
  PaymentMode,
  PaymentUnit,
} from '~/common/enums/enums';

const QUANTITY_OF_ITEMS = 1;
const OPERATION_NAME = 'Replenish your funds on GuruHub';

type Constructor = {
  secretKey: string;
  successUrl: string;
  cancelUrl: string;
  apiVersion: string;
};

class Stripe {
  #stripe: StripeApi;

  #successUrl: string;

  #cancelUrl: string;

  public constructor({
    secretKey,
    successUrl,
    cancelUrl,
    apiVersion,
  }: Constructor) {
    this.#stripe = new StripeApi(secretKey, {
      apiVersion: apiVersion as '2022-08-01',
    });
    this.#successUrl = successUrl;
    this.#cancelUrl = cancelUrl;
  }

  public initReplenish(
    amountOfMoney: number,
  ): Promise<StripeApi.Response<StripeApi.Checkout.Session>> {
    return this.#stripe.checkout.sessions.create({
      payment_method_types: [PaymentMethod.CARD],
      mode: PaymentMode.PAYMENT,
      line_items: [
        {
          price_data: {
            currency: PaymentCurrency.USD,
            product_data: {
              name: OPERATION_NAME,
            },
            unit_amount: amountOfMoney * PaymentUnit.CENTS_IN_ONE_DOLLAR,
          },
          quantity: QUANTITY_OF_ITEMS,
        },
      ],
      success_url: this.#successUrl,
      cancel_url: this.#cancelUrl,
    });
  }

  public initWithdraw(
    amount: number,
    currency: PaymentCurrency = PaymentCurrency.USD,
  ): Promise<StripeApi.Response<StripeApi.Payout>> {
    return this.#stripe.payouts.create({
      amount,
      currency,
    });
  }
}

export { Stripe };
