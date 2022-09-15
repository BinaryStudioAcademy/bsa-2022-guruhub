import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseCategoryGetResponseDto,
} from '~/common/types/types';

import { clearCategory, getAllWithCourses, getCategoryById } from './actions';

type State = {
  dataStatus: DataStatus;
  categories: CategoryGetAllItemResponseDto[];
  courseCategory: CourseCategoryGetResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  categories: [],
  courseCategory: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getAllWithCourses.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getAllWithCourses.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.categories = payload.items;
  });
  builder.addCase(getAllWithCourses.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getCategoryById.fulfilled, (state, { payload }) => {
    state.courseCategory = payload;
  });
  builder.addCase(getCategoryById.rejected, (state) => {
    state.courseCategory = null;
  });

  builder.addCase(clearCategory, (state) => {
    state.courseCategory = null;
  });
});

export { reducer };
