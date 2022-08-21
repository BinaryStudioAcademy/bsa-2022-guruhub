import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { CourseModuleGetByIdResponseDto } from 'common/types/types';

import { getById } from './actions';

type State = {
  dataStatus: DataStatus;
  courseModule: CourseModuleGetByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  courseModule: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getById.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getById.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courseModule = payload;
  });
  builder.addCase(getById.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.courseModule = null;
  });
});

export { reducer };
