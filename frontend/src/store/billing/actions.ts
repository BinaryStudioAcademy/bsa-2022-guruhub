import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  BillingReplenishParamsDto,
  UserDetailsWithMoneyBalanceDto,
  UserGetResponseWithMoneyBalanceDto,
} from 'common/types/types';

import { ActionType } from './common';

const getUserWithMoneyBalance = createAsyncThunk<
  UserGetResponseWithMoneyBalanceDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_USER_WITH_MONEY_BALANCE, async (_, { extra }) => {
  const { billingApi } = extra;
  const userWithMoneyBalance = await billingApi.getUserWithMoneyBalance();

  return userWithMoneyBalance;
});

const replenish = createAsyncThunk<
  UserDetailsWithMoneyBalanceDto,
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

const withdraw = createAsyncThunk<
  UserDetailsWithMoneyBalanceDto,
  void,
  AsyncThunkConfig
>(ActionType.WITHDRAW, async (_, { extra }) => {
  const { billingApi, notification } = extra;

  const userDetailsWithMoneyBalance = await billingApi.withdraw();

  notification.success(NotificationMessage.SUCCESSFUL_WITHDRAW_START);

  return userDetailsWithMoneyBalance;
});

export { getUserWithMoneyBalance, replenish, withdraw };
