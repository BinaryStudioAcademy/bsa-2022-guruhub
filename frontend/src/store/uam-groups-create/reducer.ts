import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { PermissionsGetAllItemResponseDto } from 'guruhub-shared/common/types/permission/permission-item-response-dto.type';

import { getPermissions } from './actions';

type State = {
  dataStatus: DataStatus;
  permissions: PermissionsGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  permissions: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getPermissions.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getPermissions.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.permissions = action.payload.items;
  });
  builder.addCase(getPermissions.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
