import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  EntityPagination,
  PermissionsGetAllResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { getPermissions, getUsers } from './actions';

type State = {
  usersDataStatus: DataStatus;
  permissionsDataStatus: DataStatus;
  permissions: PermissionsGetAllResponseDto;
  users: EntityPagination<UsersGetResponseDto>;
};

const initialState: State = {
  usersDataStatus: DataStatus.IDLE,
  permissionsDataStatus: DataStatus.IDLE,
  permissions: {
    items: [],
  },
  users: {
    items: [],
    total: 0,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.pending, (state) => {
    state.usersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.usersDataStatus = DataStatus.FULFILLED;
    state.users = action.payload;
  });
  builder.addCase(getUsers.rejected, (state) => {
    state.usersDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getPermissions.pending, (state) => {
    state.permissionsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getPermissions.fulfilled, (state, action) => {
    state.permissionsDataStatus = DataStatus.FULFILLED;
    state.permissions = action.payload;
  });
  builder.addCase(getPermissions.rejected, (state) => {
    state.permissionsDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
