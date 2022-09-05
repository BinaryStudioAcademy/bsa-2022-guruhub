import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
  CourseModulesGetByCourseIdAndMenteeIdRequestDto,
} from 'common/types/types';

import { ActionType } from './common';

const getModulesByCourseIdAndMentorId = createAsyncThunk<
  CourseModulesGetAllItemResponseDto[],
  CourseModulesGetByCourseIdAndMenteeIdRequestDto,
  AsyncThunkConfig
>(
  ActionType.GET_MODULES_BY_COURSE_ID_AND_MENTEE_ID,
  async ({ courseId, menteeId }, { extra }) => {
    const { courseModulesApi } = extra;
    const modules = await courseModulesApi.getByCourseIdAndMenteeId({
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

export { getCourseById, getModulesByCourseIdAndMentorId };
