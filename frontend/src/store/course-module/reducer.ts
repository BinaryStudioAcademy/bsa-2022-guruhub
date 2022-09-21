import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CourseModuleGetByIdResponseDto,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
} from 'common/types/types';

import {
  checkHasMentor,
  checkIsMentor,
  createNote,
  getById,
  getNotes,
  getTask,
} from './actions';

type State = {
  dataStatus: DataStatus;
  courseModule: CourseModuleGetByIdResponseDto | null;
  task: TaskGetItemReponseDto | null;
  notes: TaskNoteGetItemResponseDto[];
  totalNotesNumber: number;
  isMentor: boolean;
  hasMentor: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  courseModule: null,
  task: null,
  notes: [],
  totalNotesNumber: 0,
  isMentor: false,
  hasMentor: false,
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
  builder.addCase(createNote.fulfilled, (state, { payload }) => {
    state.notes = [payload, ...state.notes];
    state.totalNotesNumber += 1;
    (state.task as TaskGetItemReponseDto).status = payload.status;
  });
  builder.addCase(checkIsMentor.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkIsMentor.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.isMentor = payload;
  });
  builder.addCase(checkIsMentor.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(checkHasMentor.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkHasMentor.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.hasMentor = payload;
  });
  builder.addCase(checkHasMentor.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
