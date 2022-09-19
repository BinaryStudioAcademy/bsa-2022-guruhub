import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
} from 'common/types/types';

import {
  addCourse,
  getCategories,
  getCourses,
  getPopularCourses,
} from './actions';

type State = {
  dataStatus: DataStatus;
  categories: CategoryGetAllItemResponseDto[];
  courses: CourseGetResponseDto[];
  popularCourses: CourseGetResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  categories: [],
  courses: [],
  popularCourses: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourses.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourses.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courses = payload;
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

  builder.addCase(getCategories.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCategories.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.categories = action.payload.items;
  });
  builder.addCase(getCategories.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getPopularCourses.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getPopularCourses.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.popularCourses = payload;
  });
  builder.addCase(getPopularCourses.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
