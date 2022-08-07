import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import {
  UserSignUpResponseDto,
  UserSignInResponseDto,
} from 'common/types/types';
import { signUp, signIn } from './actions';

type AuthPayload = {
  payload: UserSignUpResponseDto | UserSignInResponseDto;
};

type State = {
  dataStatus: DataStatus;
  user: UserSignUpResponseDto | UserSignInResponseDto;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addMatcher(
    isAnyOf(signUp.fulfilled, signIn.fulfilled),
    (state, { payload }: AuthPayload) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.user = payload;
    },
  );
  builder.addMatcher(isAnyOf(signUp.rejected, signIn.rejected), (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
});

export { reducer };
