import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppRoute, NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  EntityPagination,
  TaskByIdRequestParamsDto,
  TaskGetByMenteeIdCourseIdModuleIdRequestDto,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
  TaskNoteManipulateRequestDto,
} from 'common/types/types';

import { ActionType } from './common';

const getTask = createAsyncThunk<
  TaskGetItemReponseDto,
  TaskGetByMenteeIdCourseIdModuleIdRequestDto,
  AsyncThunkConfig
>(ActionType.GET_TASK, async ({ courseId, menteeId, moduleId }, { extra }) => {
  const { tasksApi } = extra;
  const task = await tasksApi.getByMenteeIdCourseIdModuleId({
    courseId,
    menteeId,
    moduleId,
  });

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

const createNote = createAsyncThunk<
  TaskNoteGetItemResponseDto,
  TaskNoteManipulateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_NOTE, async ({ body, taskId }, { extra }) => {
  const { tasksApi, notification } = extra;
  const newNote = await tasksApi.manipulate({ body, taskId });

  notification.success(NotificationMessage.NOTE_ADD);

  return newNote;
});

const getModuleById = createAsyncThunk<
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MODULE_BY_ID, async ({ courseId, moduleId }, { extra }) => {
  const { courseModulesApi, notification, navigation } = extra;
  const module = await courseModulesApi.getById({ courseId, moduleId });

  if (!module) {
    notification.error(NotificationMessage.MODULE_NOT_FOUND);
    navigation.push(`${AppRoute.COURSES}/${courseId}` as AppRoute);
  }

  return module;
});

export { createNote, getModuleById, getNotes, getTask };
