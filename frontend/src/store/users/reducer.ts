import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from 'common/enums/enums';
import { UserByIdResponse } from 'common/types/types';
import { getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  users: UserByIdResponse[] | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  users: null,
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
