import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { UsersByIdResponseDto } from '~/common/types/types';

import { loadCurrentUser, logout, signIn, signUp } from './actions';

type State = {
  dataStatus: DataStatus;
  user: UsersByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      isAnyOf(
        signUp.pending,
        signIn.pending,
        logout.pending,
        loadCurrentUser.pending,
      ),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    )
    .addMatcher(
      isAnyOf(
        signUp.fulfilled,
        signIn.fulfilled,
        logout.fulfilled,
        loadCurrentUser.fulfilled,
      ),
      (state, action) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.user = action.payload;
      },
    )
    .addMatcher(
      isAnyOf(
        signUp.rejected,
        signIn.rejected,
        logout.rejected,
        loadCurrentUser.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
        state.user = null;
      },
    );
});

export { reducer };
