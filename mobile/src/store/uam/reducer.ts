import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  GroupsItemResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { signOut } from '../auth/actions';
import { deleteGroup, deleteUser, getGroups, getUsers } from './actions';

type State = {
  groupsDataStatus: DataStatus;
  usersDataStatus: DataStatus;
  groups: GroupsItemResponseDto[];
  users: UsersGetResponseDto[];
  usersTotalCount: number;
  groupsTotalCount: number;
  userDeleteDataStatus: DataStatus;
  groupDeleteDataStatus: DataStatus;
};

const initialState: State = {
  groupsDataStatus: DataStatus.IDLE,
  usersDataStatus: DataStatus.IDLE,
  users: [],
  usersTotalCount: 0,
  groups: [],
  groupsTotalCount: 0,
  userDeleteDataStatus: DataStatus.IDLE,
  groupDeleteDataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getGroups.pending, (state) => {
    state.groupsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getGroups.fulfilled, (state, action) => {
    state.groupsDataStatus = DataStatus.FULFILLED;
    state.groups = action.payload.items;
    state.groupsTotalCount = action.payload.total;
  });
  builder.addCase(getGroups.rejected, (state) => {
    state.groupsDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteGroup.pending, (state) => {
    state.groupDeleteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteGroup.fulfilled, (state, { payload }) => {
    state.groups = state.groups.filter((item) => item.id !== payload);
    state.groupsTotalCount = --state.groupsTotalCount;
    state.groupDeleteDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(deleteGroup.rejected, (state) => {
    state.groupDeleteDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getUsers.pending, (state) => {
    state.usersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.usersDataStatus = DataStatus.FULFILLED;
    state.users = action.payload.items;
    state.usersTotalCount = action.payload.total;
  });
  builder.addCase(getUsers.rejected, (state) => {
    state.usersDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteUser.pending, (state) => {
    state.userDeleteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
    state.users = state.users.filter((item) => item.id !== payload);
    state.usersTotalCount = --state.usersTotalCount;
    state.userDeleteDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(deleteUser.rejected, (state) => {
    state.userDeleteDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(signOut.fulfilled, () => {
    return initialState;
  });

  builder.addCase(signOut.rejected, () => {
    return initialState;
  });
});

export { reducer };
