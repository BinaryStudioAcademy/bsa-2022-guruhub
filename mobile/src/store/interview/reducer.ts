import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsGetOtherItemResponseDto,
} from '~/common/types/types';

import {
  getInterview,
  getInterviewersByCategory,
  getOtherByInterviewId,
  updateInterview,
} from './actions';

type State = {
  dataStatus: DataStatus;
  interviewDataStatus: DataStatus;
  interviewersDataStatus: DataStatus;
  interview: InterviewsGetAllItemResponseDto | null;
  interviewers: InterviewsGetInterviewerResponseDto[];
  otherInterviews: InterviewsGetOtherItemResponseDto[];
  totalOtherInterviewsNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  interviewDataStatus: DataStatus.IDLE,
  interviewersDataStatus: DataStatus.IDLE,
  interview: null,
  interviewers: [],
  otherInterviews: [],
  totalOtherInterviewsNumber: 0,
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

  builder.addCase(getOtherByInterviewId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getOtherByInterviewId.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.otherInterviews = payload.items;
    state.totalOtherInterviewsNumber = payload.total;
  });
  builder.addCase(getOtherByInterviewId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.otherInterviews = [];
    state.totalOtherInterviewsNumber = 0;
  });
});

export { reducer };
