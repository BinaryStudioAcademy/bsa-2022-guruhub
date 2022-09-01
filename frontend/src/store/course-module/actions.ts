import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppRoute, NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CourseGetMentorsRequestDto,
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  EntityPagination,
  TaskByIdRequestParamsDto,
  TaskGetByMenteeIdAndModuleId,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
  TaskNoteManipulateRequestDto,
  UserDetailsResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getById = createAsyncThunk<
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_BY_ID, async ({ courseId, moduleId }, { extra }) => {
  const { courseModulesApi, notification, navigation } = extra;
  const module = await courseModulesApi.getById({ courseId, moduleId });

  if (!module) {
    notification.error(NotificationMessage.MODULE_NOT_FOUND);
    navigation.push(`${AppRoute.COURSES}/${courseId}` as AppRoute);
  }

  return module;
});

const createNote = createAsyncThunk<
  TaskNoteGetItemResponseDto,
  TaskNoteManipulateRequestDto,
  AsyncThunkConfig
>(ActionType.MANIPULATE_TASK_NOTE, async ({ body, taskId }, { extra }) => {
  const { tasksApi, notification } = extra;
  const newNote = await tasksApi.manipulate({ body, taskId });

  notification.success(NotificationMessage.NOTE_ADD);

  return newNote;
});

const getTask = createAsyncThunk<
  TaskGetItemReponseDto,
  TaskGetByMenteeIdAndModuleId,
  AsyncThunkConfig
>(ActionType.GET_TASK, async ({ menteeId, moduleId }, { extra }) => {
  const { tasksApi } = extra;
  const task = await tasksApi.getByMenteeIdAndModuleId({ menteeId, moduleId });

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

const getMentorsByCourseId = createAsyncThunk<
  UserDetailsResponseDto[],
  CourseGetMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORS, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const mentors = await coursesApi.getMentorsByCourseId(payload);

  return mentors;
});

export { createNote, getById, getMentorsByCourseId, getNotes, getTask };
