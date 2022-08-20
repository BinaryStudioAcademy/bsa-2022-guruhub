import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { UserWithPermissions } from '~/common/types/types';

import { loadCurrentUser, logout, signIn, signUp } from './actions';

type State = {
  dataStatus: DataStatus;
  user: UserWithPermissions | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signIn.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadCurrentUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(signUp.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = payload;
  });
  builder.addCase(signIn.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = payload;
  });
  builder.addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = payload;
  });
  builder.addCase(logout.fulfilled, () => {
    return { ...initialState, dataStatus: DataStatus.FULFILLED };
  });

  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
  builder.addCase(signIn.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
  builder.addCase(loadCurrentUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
  builder.addCase(logout.rejected, () => {
    return { ...initialState, dataStatus: DataStatus.REJECTED };
  });
});

export { reducer };
