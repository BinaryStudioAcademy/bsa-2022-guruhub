import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CourseModuleGetByIdResponseDto,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
} from 'common/types/types';

import { createNote, getNotes, getTask } from './actions';

type State = {
  dataStatus: DataStatus;
  task: TaskGetItemReponseDto | null;
  notes: TaskNoteGetItemResponseDto[];
  notesTotalCount: number;
  module: CourseModuleGetByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  task: null,
  notes: [],
  notesTotalCount: 0,
  module: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getTask.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getTask.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.task = payload;
  });
  builder.addCase(getTask.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.task = null;
  });
  builder.addCase(getNotes.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getNotes.fulfilled, (state, { payload }) => {
    const { items, total } = payload;
    state.notes = items;
    state.notesTotalCount = total;
  });
  builder.addCase(getNotes.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.notes = [];
    state.notesTotalCount = 0;
  });
  builder.addCase(createNote.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.notes = [payload, ...state.notes];
  });
});

export { reducer };
