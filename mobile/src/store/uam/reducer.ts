import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  EntityPagination,
  GroupsItemResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { signOut } from '../auth/actions';
import { deleteGroup, deleteUser, getGroups, getUsers } from './actions';

type State = {
  groupsDataStatus: DataStatus;
  usersDataStatus: DataStatus;
  groups: EntityPagination<GroupsItemResponseDto>;
  users: EntityPagination<UsersGetResponseDto>;
  userDeleteDataStatus: DataStatus;
  groupDeleteDataStatus: DataStatus;
};

const initialState: State = {
  groupsDataStatus: DataStatus.IDLE,
  usersDataStatus: DataStatus.IDLE,
  groups: {
    items: [],
    total: 0,
  },
  users: {
    items: [],
    total: 0,
  },
  userDeleteDataStatus: DataStatus.IDLE,
  groupDeleteDataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getGroups.pending, (state) => {
    state.groupsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getGroups.fulfilled, (state, action) => {
    state.groupsDataStatus = DataStatus.FULFILLED;
    state.groups = action.payload;
  });
  builder.addCase(getGroups.rejected, (state) => {
    state.groupsDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteGroup.pending, (state) => {
    state.groupDeleteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteGroup.fulfilled, (state, { payload }) => {
    const items = state.groups.items.filter((item) => item.id !== payload);
    state.groups = {
      items: items,
      total: items.length,
    };
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
    state.users = action.payload;
  });
  builder.addCase(getUsers.rejected, (state) => {
    state.usersDataStatus = DataStatus.REJECTED;
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

  builder.addCase(signOut.fulfilled, () => {
    return initialState;
  });

  builder.addCase(signOut.rejected, () => {
    return initialState;
  });
});

export { reducer };
