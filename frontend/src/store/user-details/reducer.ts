import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { UserDetailsItemDto } from 'common/types/types';

import { getUserDetails } from './actions';

type State = {
  dataStatus: DataStatus;
  userDetails: UserDetailsItemDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  userDetails: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUserDetails.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUserDetails.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.userDetails = action.payload;
  });
  builder.addCase(getUserDetails.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
