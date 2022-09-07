import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { CourseGetResponseDto } from '~/common/types/types';

import { getCoursesWithCategory } from './actions';

type State = {
  dataStatus: DataStatus;
  coursesWithCategory: CourseGetResponseDto[];
  totalCoursesNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  coursesWithCategory: [],
  totalCoursesNumber: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCoursesWithCategory.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCoursesWithCategory.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.coursesWithCategory = payload.items;
    state.totalCoursesNumber = payload.total;
  });
  builder.addCase(getCoursesWithCategory.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
