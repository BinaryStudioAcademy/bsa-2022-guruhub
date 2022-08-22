import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { GroupsItemResponseDto, UsersGetResponseDto } from 'common/types/types';

import { deleteGroup, deleteUser, getGroups, getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  users: UsersGetResponseDto[];
  usersTotalCount: number;
  groups: GroupsItemResponseDto[];
  groupsTotalCount: number;
  userDeleteDataStatus: DataStatus;
  groupDeleteDataStatus: DataStatus;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  users: [],
  usersTotalCount: 0,
  userDeleteDataStatus: DataStatus.IDLE,
  groups: [],
  groupsTotalCount: 0,
  groupDeleteDataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.users = action.payload.items;
    state.usersTotalCount = action.payload.total;
  });
  builder.addCase(getUsers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getGroups.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getGroups.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = action.payload.items;
    state.groupsTotalCount = action.payload.total;
  });
  builder.addCase(getGroups.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteUser.pending, (state) => {
    state.userDeleteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
    state.users = state.users.filter((user) => user.id !== payload);
    state.usersTotalCount = --state.usersTotalCount;
    state.userDeleteDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(deleteUser.rejected, (state) => {
    state.userDeleteDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteGroup.pending, (state) => {
    state.groupDeleteDataStatus = DataStatus.PENDING;
  });

  builder.addCase(deleteGroup.fulfilled, (state, { payload }) => {
    state.groups = state.groups.filter((group) => group.id !== payload);
    state.groupsTotalCount = --state.groupsTotalCount;
    state.groupDeleteDataStatus = DataStatus.FULFILLED;
  });

  builder.addCase(deleteGroup.rejected, (state) => {
    state.groupDeleteDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
