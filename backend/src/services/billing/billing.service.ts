import { TransactionStatus } from '~/common/enums/enums';
import {
  TransactionCreateArgumentsDto,
  TransactionGetAllItemResponseDto,
  UserDetailsWithMoneyBalanceDto,
} from '~/common/types/types';
import {
  stripe as stripeServ,
  transaction as transactionServ,
  user as userServ,
  userDetails as userDetailsServ,
} from '~/services/services';

type Constructor = {
  stripeService: typeof stripeServ;
  transactionService: typeof transactionServ;
  userService: typeof userServ;
  userDetailsService: typeof userDetailsServ;
};

class Billing {
  #stripeService: typeof stripeServ;

  #transactionService: typeof transactionServ;

  #userService: typeof userServ;

  #userDetailsService: typeof userDetailsServ;

  public constructor({
    stripeService,
    transactionService,
    userService,
    userDetailsService,
  }: Constructor) {
    this.#stripeService = stripeService;
    this.#transactionService = transactionService;
    this.#userService = userService;
    this.#userDetailsService = userDetailsService;
  }

  public async replenish(
    userId: number,
    amountOfMoney: number,
  ): Promise<UserDetailsWithMoneyBalanceDto | null> {
    const userWithBalance = await this.#userService.getByIdWithMoneyBalance(
      userId,
    );

    const replenishDto = await this.#stripeService.initReplenish(amountOfMoney);

    if (replenishDto.status === 'complete') {
      const newBalance =
        userWithBalance.userDetails.moneyBalance + amountOfMoney;

      return this.#userDetailsService.updateMoneyBalance(userId, newBalance);
    }

    return null;
  }

  public async withdraw(
    userId: number,
  ): Promise<UserDetailsWithMoneyBalanceDto | null> {
    const userWithBalance = await this.#userService.getByIdWithMoneyBalance(
      userId,
    );

    const withdrawDto = await this.#stripeService.initWithdraw(
      userWithBalance.userDetails.moneyBalance,
    );

    if (withdrawDto.status === 'in_transit') {
      const newBalance = 0;

      return this.#userDetailsService.updateMoneyBalance(userId, newBalance);
    }

    return null;
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
}

export { Billing };
