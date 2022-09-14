import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
  EntityPagination,
  TaskByIdRequestParamsDto,
  TaskGetByMenteeIdAndModuleId,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
  TaskNoteManipulateRequestDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getCourseModules = createAsyncThunk<
  CourseModulesGetAllResponseDto,
  CourseModulesGetAllRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_COURSE_MODULES, async ({ courseId }, { extra }) => {
  const { courseModulesApi } = extra;
  const courseModules = await courseModulesApi.getAll({ courseId });

  return courseModules;
});

const getModuleById = createAsyncThunk<
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MODULE_BY_ID, async ({ courseId, moduleId }, { extra }) => {
  const { courseModulesApi } = extra;
  const courseModule = await courseModulesApi.getById({ courseId, moduleId });

  return courseModule;
});

const createNote = createAsyncThunk<
  TaskNoteGetItemResponseDto,
  TaskNoteManipulateRequestDto,
  AsyncThunkConfig
>(ActionType.MANIPULATE_TASK_NOTE, async ({ body, taskId }, { extra }) => {
  const { tasksApi } = extra;
  const newNote = await tasksApi.manipulate({ body, taskId });

  return newNote;
});

const getTask = createAsyncThunk<
  TaskGetItemReponseDto | null,
  TaskGetByMenteeIdAndModuleId,
  AsyncThunkConfig
>(ActionType.GET_TASK, async ({ menteeId, moduleId }, { extra }) => {
  const { tasksApi } = extra;
  const task = await tasksApi.getByMenteeIdAndModuleId({ menteeId, moduleId });

  if (!task) {
    return null;
  }

  return task;
});

const getNotes = createAsyncThunk<
  EntityPagination<TaskNoteGetItemResponseDto>,
  TaskByIdRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_NOTES, async ({ taskId }, { extra }) => {
  const { tasksApi } = extra;
  const notes = await tasksApi.getNotes({ taskId });

  return notes;
});

const checkIsMentor = createAsyncThunk<boolean, number, AsyncThunkConfig>(
  ActionType.CHECK_IS_MENTOR,
  async (courseId, { extra }) => {
    const { coursesApi } = extra;
    const isMentor = await coursesApi.checkIsMentor({ courseId });

    return isMentor;
  },
);

const clearModules = createAction(ActionType.CLEAR_MODULES);

export {
  checkIsMentor,
  clearModules,
  createNote,
  getCourseModules,
  getModuleById,
  getNotes,
  getTask,
};
