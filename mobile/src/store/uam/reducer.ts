import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { GroupsItemResponseDto } from '~/common/types/types';

import { getGroups } from './actions';

type State = {
  dataStatus: DataStatus;
  groups: GroupsItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groups: [],
};

const reducer = createReducer(initialState, (builder) => {
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
});

export { reducer };
