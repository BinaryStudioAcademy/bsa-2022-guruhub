import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
} from '~/common/types/types';

import {
  getInterview,
  getInterviewersByCategory,
  updateInterview,
} from './actions';

type State = {
  interviewDataStatus: DataStatus;
  interviewersDataStatus: DataStatus;
  interview: InterviewsGetAllItemResponseDto | null;
  interviewers: InterviewsGetInterviewerResponseDto[];
};

const initialState: State = {
  interviewDataStatus: DataStatus.IDLE,
  interviewersDataStatus: DataStatus.IDLE,
  interview: null,
  interviewers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getInterview.pending, (state) => {
    state.interviewDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getInterview.fulfilled, (state, { payload }) => {
    state.interviewDataStatus = DataStatus.FULFILLED;
    state.interview = payload;
  });
  builder.addCase(getInterview.rejected, (state) => {
    state.interviewDataStatus = DataStatus.REJECTED;
    state.interview = null;
  });

  builder.addCase(getInterviewersByCategory.pending, (state) => {
    state.interviewersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getInterviewersByCategory.fulfilled, (state, { payload }) => {
    state.interviewersDataStatus = DataStatus.FULFILLED;
    state.interviewers = payload;
  });
  builder.addCase(getInterviewersByCategory.rejected, (state) => {
    state.interviewersDataStatus = DataStatus.REJECTED;
    state.interviewers = [];
  });

  builder.addCase(updateInterview.pending, (state) => {
    state.interviewDataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateInterview.fulfilled, (state, action) => {
    state.interviewDataStatus = DataStatus.FULFILLED;
    state.interview = action.payload;
  });
  builder.addCase(updateInterview.rejected, (state) => {
    state.interviewDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
