import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { CourseGetResponseDto } from 'common/types/types';

import { getCourseCategories } from './actions';

type State = {
  dataStatus: DataStatus;
  courses: CourseGetResponseDto[];
  totalCoursesNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  courses: [],
  totalCoursesNumber: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourseCategories.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourseCategories.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courses = payload.items;
    state.totalCoursesNumber = payload.total;
  });
  builder.addCase(getCourseCategories.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
