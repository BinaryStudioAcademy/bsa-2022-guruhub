import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  CourseModuleGetByIdResponseDto,
  CourseModulesGetAllItemResponseDto,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
} from '~/common/types/types';

import {
  clearModules,
  createNote,
  getCourseModules,
  getModuleById,
  getNotes,
  getTask,
} from './actions';

type State = {
  dataStatus: DataStatus;
  dataModuleStatus: DataStatus;
  courseModules: CourseModulesGetAllItemResponseDto[];
  module: CourseModuleGetByIdResponseDto | null;
  task: TaskGetItemReponseDto | null;
  notes: TaskNoteGetItemResponseDto[];
  totalNotesNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  dataModuleStatus: DataStatus.IDLE,
  courseModules: [],
  module: null,
  task: null,
  notes: [],
  totalNotesNumber: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourseModules.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourseModules.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courseModules = action.payload.items;
  });
  builder.addCase(getCourseModules.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getModuleById.pending, (state) => {
    state.dataModuleStatus = DataStatus.PENDING;
  });
  builder.addCase(getModuleById.fulfilled, (state, action) => {
    state.dataModuleStatus = DataStatus.FULFILLED;
    state.module = action.payload;
  });
  builder.addCase(getModuleById.rejected, (state) => {
    state.dataModuleStatus = DataStatus.REJECTED;
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

  builder.addCase(clearModules, (state) => {
    state.courseModules = [];
  });
});

export { reducer };
