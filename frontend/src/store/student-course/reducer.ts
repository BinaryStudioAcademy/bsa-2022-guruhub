import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { CourseModulesGetAllItemResponseDto } from 'common/types/types';

import { getModulesByCourseIdAndMentorId } from './actions';

type State = {
  dataStatus: DataStatus;
  modules: CourseModulesGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  modules: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getModulesByCourseIdAndMentorId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(
    getModulesByCourseIdAndMentorId.fulfilled,
    (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.modules = payload;
    },
  );
  builder.addCase(getModulesByCourseIdAndMentorId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
