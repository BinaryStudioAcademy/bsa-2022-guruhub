import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  PermissionsGetAllItemResponseDto,
  UserWithPermissions,
} from '~/common/types/types';

import { loadCurrentUser, signIn, signOut, signUp } from './actions';

type State = {
  dataStatus: DataStatus;
  user: UserWithPermissions | null;
  userPermissions: PermissionsGetAllItemResponseDto[] | [];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
  userPermissions: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signIn.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadCurrentUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(signUp.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = payload;
  });
  builder.addCase(signIn.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = payload;
  });
  builder.addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = payload;

    if (
      JSON.stringify(state.userPermissions) !==
      JSON.stringify(payload.permissions)
    ) {
      state.userPermissions = payload.permissions;
    }
  });
  builder.addCase(signOut.fulfilled, () => {
    return initialState;
  });

  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
  builder.addCase(signIn.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
  builder.addCase(loadCurrentUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
  builder.addCase(signOut.rejected, () => {
    return initialState;
  });
});

export { reducer };
