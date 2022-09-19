import { createReducer } from '@reduxjs/toolkit';
import { DataStatus, PaginationDefaultValue } from 'common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
} from 'common/types/types';

import { addCourse, getCategories, getCourses } from './actions';

type State = {
  dataStatus: DataStatus;
  categories: CategoryGetAllItemResponseDto[];
  courses: CourseGetResponseDto[];
  totalCoursesCount: number;
  isPaginationClicked: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  categories: [],
  courses: [],
  totalCoursesCount: 0,
  isPaginationClicked: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourses.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourses.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courses = payload.results.items;
    state.totalCoursesCount = payload.results.total;
    state.isPaginationClicked =
      payload.page !== PaginationDefaultValue.DEFAULT_PAGE;
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
});

export { reducer };
