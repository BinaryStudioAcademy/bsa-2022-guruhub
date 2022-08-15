import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
} from 'common/types/types';

import { addCourse, getCategories } from './actions';

type State = {
  dataStatus: DataStatus;
  categories: CategoryGetAllItemResponseDto[];
  courses: CourseGetResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  categories: [],
  courses: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addCourse.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(addCourse.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courses.push(payload);
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
