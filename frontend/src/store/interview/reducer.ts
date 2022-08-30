import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  InterviewNoteGetAllItemResponseDto,
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsGetOtherItemResponseDto,
} from 'common/types/types';

import {
  createNote,
  getInterview,
  getInterviewersByCategory,
  getNotes,
  getOtherByInterviewId,
  updateInterview,
} from './actions';

type State = {
  dataStatus: DataStatus;
  interview: InterviewsGetAllItemResponseDto | null;
  interviewers: InterviewsGetInterviewerResponseDto[];
  notes: InterviewNoteGetAllItemResponseDto[];
  otherInterviews: InterviewsGetOtherItemResponseDto[];
  totalOtherInterviewsNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  interview: null,
  interviewers: [],
  notes: [],
  otherInterviews: [],
  totalOtherInterviewsNumber: 0,
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
  builder.addCase(getNotes.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getNotes.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.notes = payload.items;
  });
  builder.addCase(getNotes.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(createNote.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(createNote.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.notes = [...state.notes, payload];
  });
  builder.addCase(createNote.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
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
