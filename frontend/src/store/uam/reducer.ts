import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  EntityPagination,
  GroupsItemResponseDto,
  UsersGetResponseDto,
} from 'common/types/types';

import { deleteUser, getGroups, getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  users: EntityPagination<UsersGetResponseDto>;
  groups: GroupsItemResponseDto[];
  userDeleteDataStatus: DataStatus;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  users: {
    items: [],
    total: 0,
  },
  userDeleteDataStatus: DataStatus.IDLE,
  groups: [],
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
  builder.addCase(deleteUser.fulfilled, (state) => {
    state.userDeleteDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(deleteUser.rejected, (state) => {
    state.userDeleteDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
