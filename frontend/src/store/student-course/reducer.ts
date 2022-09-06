import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CourseGetResponseDto,
  TaskWithModuleResponseDto,
} from 'common/types/types';

import { getCourseById, getTasksByCourseIdAndMenteeId } from './actions';

type State = {
  dataStatus: DataStatus;
  tasks: TaskWithModuleResponseDto[];
  course: CourseGetResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  tasks: [],
  course: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getTasksByCourseIdAndMenteeId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(
    getTasksByCourseIdAndMenteeId.fulfilled,
    (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.tasks = payload;
    },
  );
  builder.addCase(getTasksByCourseIdAndMenteeId.rejected, (state) => {
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
