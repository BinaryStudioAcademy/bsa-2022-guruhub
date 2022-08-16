import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { GroupsGetByIdResponseDto } from 'common/types/types';

import { getGroupById } from './actions';

type State = {
  dataStatus: DataStatus;
  group: GroupsGetByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  group: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getGroupById.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getGroupById.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.group = payload;
  });
  builder.addCase(getGroupById.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
