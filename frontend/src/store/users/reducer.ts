import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { UserResponse } from 'common/types/types';
import { getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  users: UserResponse[] | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  users: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.users = action.payload;
  });
  builder.addCase(getUsers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
