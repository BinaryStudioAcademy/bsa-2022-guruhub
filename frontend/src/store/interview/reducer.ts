import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  InterviewNoteGetAllItemResponseDto,
  InterviewsGetOtherItemResponseDto,
} from 'common/types/types';

import { createNote, getNotes, getOtherByInterviewId } from './actions';

type State = {
  dataStatus: DataStatus;
  notes: InterviewNoteGetAllItemResponseDto[];
  otherInterviews: InterviewsGetOtherItemResponseDto[];
  totalOtherInterviewsNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  notes: [],
  otherInterviews: [],
  totalOtherInterviewsNumber: 0,
};

const reducer = createReducer(initialState, (builder) => {
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
    state.notes = [payload, ...state.notes];
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
