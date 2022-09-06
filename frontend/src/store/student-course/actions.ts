import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  TasksGetByCourseIdAndMenteeIdRequestDto,
  TaskWithModuleResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getTasksByCourseIdAndMenteeId = createAsyncThunk<
  TaskWithModuleResponseDto[],
  TasksGetByCourseIdAndMenteeIdRequestDto,
  AsyncThunkConfig
>(
  ActionType.GET_MODULES_BY_COURSE_ID_AND_MENTEE_ID,
  async ({ courseId, menteeId }, { extra }) => {
    const { tasksApi } = extra;
    const modules = await tasksApi.getAllByCourseIdAndMenteeId({
      courseId,
      menteeId,
    });

    return modules;
  },
);

const getCourseById = createAsyncThunk<
  CourseGetResponseDto,
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_COURSE, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const { id } = payload;
  const course = await coursesApi.getById({ id });

  return course;
});

export { getCourseById, getTasksByCourseIdAndMenteeId };
