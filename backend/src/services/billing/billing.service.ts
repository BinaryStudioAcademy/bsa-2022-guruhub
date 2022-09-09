import StripeApi from 'stripe';

import { PaymentCurrency, TransactionStatus } from '~/common/enums/enums';
import {
  TransactionCreateArgumentsDto,
  TransactionGetAllItemResponseDto,
} from '~/common/types/types';
import {
  stripe as stripeServ,
  transaction as transactionServ,
} from '~/services/services';

type Constructor = {
  transactionService: typeof transactionServ;
  stripeService: typeof stripeServ;
};

class Billing {
  #transactionService: typeof transactionServ;

  #stripeService: typeof stripeServ;

  public constructor({ transactionService, stripeService }: Constructor) {
    this.#transactionService = transactionService;
    this.#stripeService = stripeService;
  }

  public initReplenish(
    amountOfMoney: number,
  ): Promise<StripeApi.Response<StripeApi.Checkout.Session>> {
    return this.#stripeService.initReplenish(amountOfMoney);
  }

  public initWithdraw(
    amount: number,
    currency: PaymentCurrency = PaymentCurrency.USD,
  ): Promise<StripeApi.Response<StripeApi.Payout>> {
    return this.#stripeService.initWithdraw(amount, currency);
  }

  public makeTransaction(
    transactionCreateBody: TransactionCreateArgumentsDto,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionService.create(transactionCreateBody);
  }

  public holdTransaction(
    transactionId: number,
  ): Promise<TransactionGetAllItemResponseDto> {
    const NEW_TRANSACTION_STATUS = TransactionStatus.HOLD;

    return this.#transactionService.updateStatus({
      transactionId,
      newStatus: NEW_TRANSACTION_STATUS,
    });
  }

  public fulfillTransaction(
    transactionId: number,
  ): Promise<TransactionGetAllItemResponseDto> {
    const NEW_TRANSACTION_STATUS = TransactionStatus.FULFILLED;

    return this.#transactionService.updateStatus({
      transactionId,
      newStatus: NEW_TRANSACTION_STATUS,
    });
  }

  public rejectTransaction(
    transactionId: number,
  ): Promise<TransactionGetAllItemResponseDto> {
    const NEW_TRANSACTION_STATUS = TransactionStatus.REJECTED;

    return this.#transactionService.updateStatus({
      transactionId,
      newStatus: NEW_TRANSACTION_STATUS,
    });
  }
}

export { Billing };
