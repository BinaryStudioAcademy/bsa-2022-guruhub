import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseCategoryGetResponseDto,
} from '~/common/types/types';

import {
  clearCategory,
  getAllCategories,
  getCategoryById,
  getExistCategories,
} from './actions';

type State = {
  dataStatus: DataStatus;
  categories: CategoryGetAllItemResponseDto[];
  allCategories: CategoryGetAllItemResponseDto[];
  courseCategory: CourseCategoryGetResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  categories: [],
  allCategories: [],
  courseCategory: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getExistCategories.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getExistCategories.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.categories = payload.items;
  });
  builder.addCase(getExistCategories.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getAllCategories.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.allCategories = payload.items;
  });
  builder.addCase(getAllCategories.rejected, (state) => {
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
