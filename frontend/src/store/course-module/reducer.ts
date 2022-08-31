import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CourseModuleGetByIdResponseDto,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
} from 'common/types/types';

import { createNote, getById, getNotes, getTask } from './actions';

type State = {
  dataStatus: DataStatus;
  courseModule: CourseModuleGetByIdResponseDto | null;
  task: TaskGetItemReponseDto | null;
  notes: TaskNoteGetItemResponseDto[];
  totalNotesNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  courseModule: null,
  task: null,
  notes: [],
  totalNotesNumber: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getById.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getById.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courseModule = payload;
  });
  builder.addCase(getById.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.courseModule = null;
  });
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
    state.dataStatus = DataStatus.FULFILLED;
    state.notes = payload.items;
    state.totalNotesNumber = payload.total;
  });
  builder.addCase(getNotes.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.notes = [];
    state.totalNotesNumber = 0;
  });
  builder.addCase(createNote.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(createNote.fulfilled, (state, { payload }) => {
    state.notes.push(payload);
    state.totalNotesNumber += 1;
  });
  builder.addCase(createNote.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
