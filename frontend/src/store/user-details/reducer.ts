import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { UserDetailsResponseDto } from 'common/types/types';

import { getUserDetails, updateUserAvatar, updateUserDetails } from './actions';

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
  builder.addCase(getUserDetails.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.userDetails = action.payload;
    state.avatarUrl = action.payload.avatar?.url ?? null;
  });
  builder.addCase(getUserDetails.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateUserDetails.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateUserDetails.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(updateUserDetails.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateUserAvatar.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.avatarUrl = payload.avatar?.url ?? null;
  });
  builder.addCase(updateUserAvatar.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
