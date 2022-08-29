import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { UserDetailsResponseDto } from '~/common/types/types';

import { getUserDetails, updateUserDetails } from './actions';

type State = {
  dataStatus: DataStatus;
  userDetails: UserDetailsResponseDto | null;
  avatarUrl: string | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  userDetails: null,
  avatarUrl: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUserDetails.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.userDetails = payload;
    state.avatarUrl = payload?.avatarUrl;
  });
  builder.addCase(getUserDetails.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(updateUserDetails.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateUserDetails.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.userDetails = payload;
  });
  builder.addCase(updateUserDetails.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
