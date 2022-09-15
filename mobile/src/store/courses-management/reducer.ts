import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
} from '~/common/types/types';

import { getAllWithCategories, getCategories } from './actions';

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
  builder.addCase(getAllWithCategories.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getAllWithCategories.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courses = payload.items;
    state.totalCoursesNumber = payload.total;
  });
  builder.addCase(getAllWithCategories.rejected, (state) => {
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
});

export { reducer };
