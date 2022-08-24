import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
} from 'common/types/types';

import {
  getCourse,
  getModules,
  getPendingOrPassedInterviewsCategoryIdsByUserId,
} from './actions';

type State = {
  dataStatus: DataStatus;
  course: CourseGetResponseDto | null;
  modules: CourseModulesGetAllItemResponseDto[];
  pendingOrPassedInterviewsCategoryIds: number[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  course: null,
  modules: [],
  pendingOrPassedInterviewsCategoryIds: [],
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
    getPendingOrPassedInterviewsCategoryIdsByUserId.fulfilled,
    (state, { payload }) => {
      state.pendingOrPassedInterviewsCategoryIds = payload;
    },
  );
  builder.addCase(
    getPendingOrPassedInterviewsCategoryIdsByUserId.rejected,
    (state) => {
      state.pendingOrPassedInterviewsCategoryIds = [];
    },
  );
});

export { reducer };
