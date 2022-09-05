import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
} from 'common/types/types';

import { getCourseById, getModulesByCourseIdAndMentorId } from './actions';

type State = {
  dataStatus: DataStatus;
  modules: CourseModulesGetAllItemResponseDto[];
  course: CourseGetResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  modules: [],
  course: null,
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
  builder.addCase(getCourseById.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourseById.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.course = payload;
  });
  builder.addCase(getCourseById.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
