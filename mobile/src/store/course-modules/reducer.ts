import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { CourseModulesGetAllItemResponseDto } from '~/common/types/types';

import { getCourseModules } from './actions';

type State = {
  dataStatus: DataStatus;
  courseModules: CourseModulesGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  courseModules: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourseModules.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourseModules.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courseModules = action.payload.items;
  });
  builder.addCase(getCourseModules.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
