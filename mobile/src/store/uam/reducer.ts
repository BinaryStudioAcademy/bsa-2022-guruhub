import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { EntityPagination, GroupsItemResponseDto } from '~/common/types/types';

import { getGroups } from './actions';

type State = {
  dataStatus: DataStatus;
  groups: EntityPagination<GroupsItemResponseDto>;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groups: {
    items: [],
    total: 0,
  },
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
});

export { reducer };
