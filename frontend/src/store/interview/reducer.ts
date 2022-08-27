import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
} from 'common/types/types';

import {
  getInterview,
  getInterviewersByCategory,
  updateInterview,
} from './actions';

type State = {
  dataStatus: DataStatus;
  interview: InterviewsGetAllItemResponseDto | null;
  interviewers: InterviewsGetInterviewerResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  interview: null,
  interviewers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getInterview.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getInterview.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.interview = action.payload;
  });
  builder.addCase(getInterview.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateInterview.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateInterview.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.interview = action.payload;
  });
  builder.addCase(updateInterview.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(getInterviewersByCategory.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getInterviewersByCategory.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.interviewers = action.payload;
  });
  builder.addCase(getInterviewersByCategory.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
