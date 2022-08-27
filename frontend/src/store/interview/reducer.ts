import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { InterviewNoteGetAllItemResponseDto } from 'common/types/types';

import { createNote, getNotes } from './actions';

type State = {
  dataStatus: DataStatus;
  notes: InterviewNoteGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  notes: [],
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
    state.notes = [...state.notes, payload];
  });
  builder.addCase(createNote.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
