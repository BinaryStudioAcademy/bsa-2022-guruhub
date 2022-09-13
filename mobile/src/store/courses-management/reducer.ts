import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { CourseGetResponseDto } from '~/common/types/types';

import {
  getAllWithCategories,
  setNavigateFromCoursesManagement,
  unsetNavigateFromCoursesManagement,
} from './actions';

type State = {
  dataStatus: DataStatus;
  coursesWithCategory: CourseGetResponseDto[];
  totalCoursesNumber: number;
  navigateFromCoursesManagement: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  coursesWithCategory: [],
  totalCoursesNumber: 0,
  navigateFromCoursesManagement: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getAllWithCategories.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getAllWithCategories.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.coursesWithCategory = payload.items;
    state.totalCoursesNumber = payload.total;
  });
  builder.addCase(getAllWithCategories.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(setNavigateFromCoursesManagement, (state) => {
    state.navigateFromCoursesManagement = true;
  });

  builder.addCase(unsetNavigateFromCoursesManagement, (state) => {
    state.navigateFromCoursesManagement = false;
  });
});

export { reducer };
