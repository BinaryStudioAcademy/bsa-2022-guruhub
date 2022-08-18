import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  EntityPagination,
  PermissionsGetAllResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { uamActions } from '../actions';
import { getPermissions } from './actions';

type State = {
  dataStatus: DataStatus;
  permissions: PermissionsGetAllResponseDto;
  users: EntityPagination<UsersGetResponseDto>;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  permissions: {
    items: [],
  },
  users: {
    items: [],
    total: 0,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(uamActions.getUsers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(uamActions.getUsers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.users = action.payload;
  });
  builder.addCase(uamActions.getUsers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getPermissions.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getPermissions.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.permissions = action.payload;
  });
  builder.addCase(getPermissions.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
