import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
  UsersGetResponseDto,
} from 'common/types/types';

import {
  createMentor,
  getCategories,
  getCourse,
  getMentors,
  getModules,
  getPassedInterviewsCategoryIdsByUserId,
  setIsMentorButtonVisible,
  updateCategory,
} from './actions';

type State = {
  dataStatus: DataStatus;
  course: CourseGetResponseDto | null;
  modules: CourseModulesGetAllItemResponseDto[];
  passedInterviewsCategoryIds: number[];
  isMentorButtonVisible: boolean;
  mentors: UsersGetResponseDto[];
  categories: CategoryGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  course: null,
  modules: [],
  passedInterviewsCategoryIds: [],
  isMentorButtonVisible: false,
  mentors: [],
  categories: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourse.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourse.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.course = payload;
  });
  builder.addCase(getCourse.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getModules.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getModules.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.modules = payload.items;
  });
  builder.addCase(getModules.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(
    getPassedInterviewsCategoryIdsByUserId.fulfilled,
    (state, { payload }) => {
      state.passedInterviewsCategoryIds = payload;
    },
  );
  builder.addCase(getPassedInterviewsCategoryIdsByUserId.rejected, (state) => {
    state.passedInterviewsCategoryIds = [];
  });
  builder.addCase(setIsMentorButtonVisible.fulfilled, (state, { payload }) => {
    state.isMentorButtonVisible = payload;
  });
  builder.addCase(getMentors.fulfilled, (state, { payload }) => {
    state.mentors = payload;
  });
  builder.addCase(getMentors.rejected, (state) => {
    state.mentors = [];
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

  builder.addCase(updateCategory.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateCategory.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.course = action.payload;
  });
  builder.addCase(updateCategory.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(createMentor.fulfilled, (state) => {
    state.isMentorButtonVisible = false;
  });
});

export { reducer };
