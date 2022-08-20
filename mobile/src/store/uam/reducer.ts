import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  EntityPagination,
  GroupsItemResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { logout } from '../auth/actions';
import { deleteGroup, deleteUser, getGroups, getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  groups: EntityPagination<GroupsItemResponseDto>;
  users: EntityPagination<UsersGetResponseDto>;
  userDeleteDataStatus: DataStatus;
  groupDeleteDataStatus: DataStatus;
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
  groupDeleteDataStatus: DataStatus.IDLE,
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

  builder.addCase(logout.fulfilled, () => {
    return { ...initialState, dataStatus: DataStatus.FULFILLED };
  });

  builder.addCase(logout.rejected, () => {
    return { ...initialState, dataStatus: DataStatus.REJECTED };
  });
});

export { reducer };
