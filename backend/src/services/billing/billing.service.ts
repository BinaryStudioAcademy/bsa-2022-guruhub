import StripeApi from 'stripe';

import {
  ExceptionMessage,
  PaymentUnit,
  TransactionStatus,
} from '~/common/enums/enums';
import {
  BillingApiVersion,
  BillingInitHoldStudentPaymentArgumentsDto,
  BillingReplenishArgumentsDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  StripeReplenishArgumentsDto,
  TransactionCreateArgumentsDto,
  TransactionGetAllItemResponseDto,
} from '~/common/types/types';
import { BillingError } from '~/exceptions/exceptions';
import {
  transaction as transactionServ,
  user as userServ,
  userDetails as userDetailsServ,
} from '~/services/services';

type Constructor = {
  secretKey: string;
  apiVersion: BillingApiVersion;
  transactionService: typeof transactionServ;
  userService: typeof userServ;
  userDetailsService: typeof userDetailsServ;
};

class Billing {
  #transactionService: typeof transactionServ;

  #userService: typeof userServ;

  #userDetailsService: typeof userDetailsServ;

  #stripe: StripeApi;

  private static BILLING_CURRENCY = 'usd';

  private static DEFAULT_STUDYING_PRICE_COEFFICIENT = 0.5;

  private static NEW_USER_BALANCE_AFTER_WITHDRAW = 0;

  public constructor({
    transactionService,
    userService,
    userDetailsService,
    secretKey,
    apiVersion,
  }: Constructor) {
    this.#stripe = new StripeApi(secretKey, {
      apiVersion,
    });
    this.#transactionService = transactionService;
    this.#userService = userService;
    this.#userDetailsService = userDetailsService;
  }

  public async replenish({
    userId,
    amountOfMoneyToReplenish,
    token,
  }: BillingReplenishArgumentsDto): Promise<number> {
    const userBalance = await this.#userService.getByIdMoneyBalance(userId);

    await this.initReplenish({
      amount: amountOfMoneyToReplenish,
      token,
    });

    const newBalance = userBalance + amountOfMoneyToReplenish;

    return this.#userDetailsService.updateMoneyBalance(userId, newBalance);
  }

  public async withdraw(userId: number): Promise<number> {
    const userBalance = await this.#userService.getByIdMoneyBalance(userId);

    await this.initWithdraw(userBalance);

    return this.#userDetailsService.updateMoneyBalance(
      userId,
      Billing.NEW_USER_BALANCE_AFTER_WITHDRAW,
    );
  }

  public getTransactionsByUserId(
    userId: number,
    pagination: EntityPaginationRequestQueryDto,
  ): Promise<EntityPagination<TransactionGetAllItemResponseDto>> {
    return this.#transactionService.getTransactionsByUserId(userId, pagination);
  }

  public async initHoldStudentPayment({
    menteeId,
    mentorId,
    rawPriceOfStudying,
  }: BillingInitHoldStudentPaymentArgumentsDto): Promise<void> {
    const menteeBalance = await this.#userService.getByIdMoneyBalance(menteeId);

    const priceOfStudying =
      rawPriceOfStudying * Billing.DEFAULT_STUDYING_PRICE_COEFFICIENT;

    if (menteeBalance < priceOfStudying) {
      const symbolsAmount = 2;
      const requiredBalance = `You need to add $${(
        priceOfStudying - menteeBalance
      ).toFixed(symbolsAmount)} to your balance.`;

      throw new BillingError({
        message: `${ExceptionMessage.NOT_ENOUGH_FUNDS_TO_PAY_FOR_MENTORS_SERVICES} ${requiredBalance}`,
      });
    }

    const newMenteeBalance = menteeBalance - priceOfStudying;

    await this.#userDetailsService.updateMoneyBalance(
      menteeId,
      newMenteeBalance,
    );

    const transaction = await this.makeTransaction({
      senderId: menteeId,
      receiverId: mentorId,
      amount: priceOfStudying,
    });
    await this.holdTransaction(transaction.id);
  }

  public getHoldTransactionBySenderAndReceiverId(
    senderId: number,
    receiverId: number,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionService.getHoldBySenderAndReceiverId(
      senderId,
      receiverId,
    );
  }

  public initReplenish({
    amount,
    token,
  }: StripeReplenishArgumentsDto): Promise<StripeApi.Charge> {
    try {
      return this.#stripe.charges.create({
        source: token.id,
        amount: amount * PaymentUnit.CENTS_IN_ONE_DOLLAR,
        currency: Billing.BILLING_CURRENCY,
      });
    } catch (err) {
      this.throwError(err);
    }
  }

  public initWithdraw(
    amount: number,
  ): Promise<StripeApi.Response<StripeApi.Payout>> {
    try {
      return this.#stripe.payouts.create({
        amount: amount * PaymentUnit.CENTS_IN_ONE_DOLLAR,
        currency: Billing.BILLING_CURRENCY,
      });
    } catch (err) {
      this.throwError(err);
    }
  }

  public makeTransaction(
    transactionCreateBody: TransactionCreateArgumentsDto,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionService.create(transactionCreateBody);
  }

  public holdTransaction(
    transactionId: number,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionService.updateStatus({
      transactionId,
      newStatus: TransactionStatus.HOLD,
    });
  }

  public fulfillTransaction(
    transactionId: number,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionService.updateStatus({
      transactionId,
      newStatus: TransactionStatus.FULFILLED,
    });
  }

  public rejectTransaction(
    transactionId: number,
  ): Promise<TransactionGetAllItemResponseDto> {
    return this.#transactionService.updateStatus({
      transactionId,
      newStatus: TransactionStatus.REJECTED,
    });
  }

  private throwError(err: unknown): never {
    if (err instanceof StripeApi.errors.StripeError) {
      throw new BillingError({
        message: err.message,
        status: err.statusCode,
      });
    }
    throw new BillingError({ cause: err });
  }
}

export { Billing };
