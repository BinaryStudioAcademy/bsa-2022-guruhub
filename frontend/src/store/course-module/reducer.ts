import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { CourseModuleGetResponseDto } from 'common/types/types';

import { getById } from './actions';

type State = {
  dataStatus: DataStatus;
  module: CourseModuleGetResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  module: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getById.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getById.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.module = payload;
  });
  builder.addCase(getById.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.module = null;
  });
});

export { reducer };
