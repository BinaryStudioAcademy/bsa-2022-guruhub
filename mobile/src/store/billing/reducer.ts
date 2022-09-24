import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';

import { getUserWithMoneyBalance, replenish, withdraw } from './actions';

type State = {
  dataStatus: DataStatus;
  userMoneyBalance: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  userMoneyBalance: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUserWithMoneyBalance.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUserWithMoneyBalance.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.userMoneyBalance = action.payload;
  });
  builder.addCase(getUserWithMoneyBalance.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(replenish.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(replenish.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.userMoneyBalance = action.payload;
  });
  builder.addCase(replenish.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(withdraw.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(withdraw.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.userMoneyBalance = action.payload;
  });
  builder.addCase(withdraw.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
