import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
} from 'common/types/types';

import { getCategories, getCourses, updateCategory } from './actions';

type State = {
  dataStatus: DataStatus;
  courses: CourseGetResponseDto[];
  categories: CategoryGetAllItemResponseDto[];
  totalCoursesNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  courses: [],
  categories: [],
  totalCoursesNumber: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourses.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourses.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courses = payload.items;
    state.totalCoursesNumber = payload.total;
  });
  builder.addCase(getCourses.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(getCategories.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCategories.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.categories = payload.items;
  });
  builder.addCase(getCategories.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateCategory.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateCategory.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    const foundIndex = state.courses.findIndex(
      (course) => course.id === action.payload.id,
    );
    state.courses[foundIndex] = action.payload;
  });
  builder.addCase(updateCategory.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
