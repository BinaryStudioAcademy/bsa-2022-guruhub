import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  EntityPagination,
  GroupsItemResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { deleteGroups, deleteUser, getGroups, getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  groups: EntityPagination<GroupsItemResponseDto>;
  users: EntityPagination<UsersGetResponseDto>;
  userDeleteDataStatus: DataStatus;
  groupsDeleteDataStatus: DataStatus;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groups: {
    items: [],
    total: 0,
  },
  users: {
    items: [],
    total: 0,
  },
  userDeleteDataStatus: DataStatus.IDLE,
  groupsDeleteDataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getGroups.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getGroups.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = action.payload;
  });
  builder.addCase(getGroups.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteGroups.pending, (state) => {
    state.groupsDeleteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteGroups.fulfilled, (state, { payload }) => {
    const items = state.groups.items.filter((item) => item.id !== payload);
    state.groups = {
      items: items,
      total: items.length,
    };
    state.groupsDeleteDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(deleteGroups.rejected, (state) => {
    state.groupsDeleteDataStatus = DataStatus.REJECTED;
  });

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

  builder.addCase(deleteUser.pending, (state) => {
    state.userDeleteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
    const items = state.users.items.filter((item) => item.id !== payload);

    state.users = {
      items: items,
      total: items.length,
    };
    state.userDeleteDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(deleteUser.rejected, (state) => {
    state.userDeleteDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
