import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { CourseGetResponseDto } from '~/common/types/types';

import { addCourse, getCourses } from './actions';

type State = {
  dataStatus: DataStatus;
  courses: CourseGetResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  courses: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourses.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourses.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courses = action.payload;
  });
  builder.addCase(getCourses.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(addCourse.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(addCourse.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(addCourse.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
