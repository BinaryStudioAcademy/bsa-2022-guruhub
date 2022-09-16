import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  BillingReplenishParamsDto,
  BillingWithdrawDto,
} from 'common/types/types';

import { ActionType } from './common';

const MINIMAL_AMOUNT_OF_MONEY_TO_WITHDRAW = 1;

const getUserWithMoneyBalance = createAsyncThunk<
  number,
  void,
  AsyncThunkConfig
>(ActionType.GET_USER_WITH_MONEY_BALANCE, async (_, { extra }) => {
  const { billingApi } = extra;
  const userWithMoneyBalance = await billingApi.getUserMoneyBalance();

  return userWithMoneyBalance;
});

const replenish = createAsyncThunk<
  number,
  BillingReplenishParamsDto,
  AsyncThunkConfig
>(
  ActionType.REPLENISH,
  async ({ amountOfMoneyToReplenish, token }, { extra }) => {
    const { billingApi, notification } = extra;
    const userDetailsWithMoneyBalance = await billingApi.replenish({
      amountOfMoneyToReplenish,
      token,
    });

    notification.success(NotificationMessage.SUCCESSFULL_REPLENISH);

    return userDetailsWithMoneyBalance;
  },
);

const withdraw = createAsyncThunk<number, BillingWithdrawDto, AsyncThunkConfig>(
  ActionType.WITHDRAW,
  async ({ userCurrentBalance: usersCurrentBalance }, { extra }) => {
    const { billingApi, notification } = extra;

    if (usersCurrentBalance >= MINIMAL_AMOUNT_OF_MONEY_TO_WITHDRAW) {
      const newUsersMoneyBalance = await billingApi.withdraw();
      notification.success(NotificationMessage.SUCCESSFUL_WITHDRAW_START);

      return newUsersMoneyBalance;
    }

    notification.info(NotificationMessage.NOT_ENOUGH_FUNDS_TO_WITHDRAW);

    return usersCurrentBalance;
  },
);

export { getUserWithMoneyBalance, replenish, withdraw };
