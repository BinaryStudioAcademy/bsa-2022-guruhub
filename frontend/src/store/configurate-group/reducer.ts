import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  GroupsGetByIdResponseDto,
  PermissionsGetAllItemResponseDto,
  UsersGetResponseDto,
} from 'common/types/types';

import { uamActions } from '../actions';
import { getGroupById, getPermissions } from './actions';

type State = {
  dataStatus: DataStatus;
  users: UsersGetResponseDto[];
  usersTotalCount: number;
  permissions: PermissionsGetAllItemResponseDto[];
  group: GroupsGetByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  users: [],
  usersTotalCount: 0,
  permissions: [],
  group: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(uamActions.getUsers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(uamActions.getUsers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.users = action.payload.items;
    state.usersTotalCount = action.payload.total;
  });
  builder.addCase(uamActions.getUsers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getPermissions.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getPermissions.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.permissions = payload.items;
  });
  builder.addCase(getPermissions.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(getGroupById.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getGroupById.fulfilled, (state, { payload }) => {
    state.group = payload;
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getGroupById.rejected, (state) => {
    state.group = null;
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
