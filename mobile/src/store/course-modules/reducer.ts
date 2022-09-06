import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  CourseModuleGetByIdResponseDto,
  CourseModulesGetAllItemResponseDto,
} from '~/common/types/types';

import { getCourseModules, getModuleById } from './actions';

type State = {
  dataStatus: DataStatus;
  dataModuleStatus: DataStatus;
  courseModules: CourseModulesGetAllItemResponseDto[];
  module: CourseModuleGetByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  dataModuleStatus: DataStatus.IDLE,
  courseModules: [],
  module: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourseModules.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourseModules.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courseModules = action.payload.items;
  });
  builder.addCase(getCourseModules.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getModuleById.pending, (state) => {
    state.dataModuleStatus = DataStatus.PENDING;
  });
  builder.addCase(getModuleById.fulfilled, (state, action) => {
    state.dataModuleStatus = DataStatus.FULFILLED;
    state.module = action.payload;
  });
  builder.addCase(getModuleById.rejected, (state) => {
    state.dataModuleStatus = DataStatus.REJECTED;
  });
});

export { reducer };
