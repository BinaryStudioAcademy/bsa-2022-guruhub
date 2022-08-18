import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { GroupGetByIdResponseDto } from '~/common/types/types';

import { cancelEdit, editGroup, getGroupById } from './actions';

type State = {
  dataStatus: DataStatus;
  group: GroupGetByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  group: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getGroupById.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getGroupById.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.group = action.payload;
  });
  builder.addCase(getGroupById.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.group = null;
  });

  builder.addCase(editGroup.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(editGroup.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(editGroup.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.group = null;
  });

  builder.addCase(cancelEdit, (state) => {
    state.group = null;
  });
});

export { reducer };
