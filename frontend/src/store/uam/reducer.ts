import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  GroupsGetAllItemResponseDto,
  UsersGetAllItemResponseDto,
} from 'common/types/types';

import { deleteUser, getGroups, getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  userDeleteDataStatus: DataStatus;
  users: UsersGetAllItemResponseDto[];
  groups: GroupsGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  userDeleteDataStatus: DataStatus.IDLE,
  users: [],
  groups: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.users = action.payload.items;
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
  });
  builder.addCase(getGroups.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteUser.pending, (state) => {
    state.userDeleteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteUser.fulfilled, (state, action) => {
    state.userDeleteDataStatus = DataStatus.FULFILLED;
    state.users = state.users.filter(
      (user) => user.id !== Number(action.payload),
    );
  });
  builder.addCase(deleteUser.rejected, (state) => {
    state.userDeleteDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
