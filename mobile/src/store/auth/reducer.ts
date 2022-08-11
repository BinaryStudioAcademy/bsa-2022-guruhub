import { createReducer } from '@reduxjs/toolkit';
import { UserSignInResponseDto } from 'guruhub-shared';

import { DataStatus } from '~/common/enums/enums';

import { signIn, signUp } from './actions';

type State = {
  dataStatus: DataStatus;
  user?: UserSignInResponseDto;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: {
    token: '',
    user: {
      id: 0,
      email: '',
    },
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signUp.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(signIn.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signIn.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(signIn.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
