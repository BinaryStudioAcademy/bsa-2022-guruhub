import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  UserDetailsWithMoneyBalanceDto,
  UserGetResponseWithMoneyBalanceDto,
} from 'common/types/types';

import { getUserWithMoneyBalance, replenish, withdraw } from './actions';

type State = {
  dataStatus: DataStatus;
  userWithMoneyBalance: UserGetResponseWithMoneyBalanceDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  userWithMoneyBalance: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUserWithMoneyBalance.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUserWithMoneyBalance.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.userWithMoneyBalance = action.payload;
  });
  builder.addCase(getUserWithMoneyBalance.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(replenish.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(replenish.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    const { id, email, createdAt } =
      state.userWithMoneyBalance as UserGetResponseWithMoneyBalanceDto;
    state.userWithMoneyBalance = {
      id,
      email,
      createdAt,
      userDetails: action.payload as UserDetailsWithMoneyBalanceDto,
    };
  });
  builder.addCase(replenish.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(withdraw.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(withdraw.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    const { id, email, createdAt } =
      state.userWithMoneyBalance as UserGetResponseWithMoneyBalanceDto;
    state.userWithMoneyBalance = {
      id,
      email,
      createdAt,
      userDetails: action.payload as UserDetailsWithMoneyBalanceDto,
    };
  });
  builder.addCase(withdraw.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
