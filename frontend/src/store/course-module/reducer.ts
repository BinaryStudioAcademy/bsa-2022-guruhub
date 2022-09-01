import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CourseModuleGetByIdResponseDto,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
  UserDetailsResponseDto,
} from 'common/types/types';

import {
  createNote,
  getById,
  getMentorsByCourseId,
  getNotes,
  getTask,
} from './actions';

type State = {
  dataStatus: DataStatus;
  courseModule: CourseModuleGetByIdResponseDto | null;
  task: TaskGetItemReponseDto | null;
  notes: TaskNoteGetItemResponseDto[];
  totalNotesNumber: number;
  mentors: UserDetailsResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  courseModule: null,
  task: null,
  notes: [],
  totalNotesNumber: 0,
  mentors: [],
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
  });
  builder.addCase(getMentorsByCourseId.fulfilled, (state, { payload }) => {
    state.mentors = payload;
  });
});

export { reducer };
