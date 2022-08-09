import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { UsersGetAllResponseDto } from 'common/types/types';
import { PermissionsGetAllResponseDto } from 'guruhub-shared';

import { getPermissions, getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  users: UsersGetAllResponseDto;
  permissions: PermissionsGetAllResponseDto;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  users: { items: [] },
  permissions: { items: [] },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getPermissions.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.users = action.payload;
  });
  builder.addCase(getPermissions.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.permissions = action.payload;
  });
  builder.addCase(getUsers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(getPermissions.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
