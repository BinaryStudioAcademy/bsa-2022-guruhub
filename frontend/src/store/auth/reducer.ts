import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { UserByIdResponse } from 'common/types/types';
import { signUp, signIn, getCurrentUser } from './actions';

type State = {
  dataStatus: DataStatus;
  user: UserByIdResponse | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher(
    isAnyOf(signUp.pending, signIn.pending, getCurrentUser.pending),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
    },
  );
  builder.addMatcher(
    isAnyOf(signUp.fulfilled, signIn.fulfilled, getCurrentUser.fulfilled),
    (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.user = action.payload;
    },
  );
  builder.addMatcher(
    isAnyOf(signUp.rejected, signIn.rejected, getCurrentUser.rejected),
    (state) => {
      state.dataStatus = DataStatus.REJECTED;
      state.user = null;
    },
  );
});

export { reducer };
