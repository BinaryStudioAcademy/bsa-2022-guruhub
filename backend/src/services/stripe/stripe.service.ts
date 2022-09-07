import StripeApi from 'stripe';

type Constructor = {
  secretKey: string;
};

class Stripe {
  #stripe: StripeApi;

  public constructor({ secretKey }: Constructor) {
    this.#stripe = new StripeApi(secretKey, { apiVersion: '2022-08-01' });
  }

  // public async initTransactionOperation(): Promise<void> {

  // }
}

export { Stripe };
