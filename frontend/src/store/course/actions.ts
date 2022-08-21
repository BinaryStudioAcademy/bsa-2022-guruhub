import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllResponseDto,
  CourseModulesGetRequestDto,
} from 'common/types/types';

import { ActionType } from './common';

const getCourse = createAsyncThunk<
  CourseGetResponseDto,
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_COURSE, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const { id } = payload;
  const course = await coursesApi.getById({ id });

  return course;
});

const getModules = createAsyncThunk<
  CourseModulesGetAllResponseDto,
  CourseModulesGetRequestDto,
  AsyncThunkConfig
>(ActionType.GET_MODULES, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const { courseId } = payload;

  const modules = await coursesApi.getCourseModulesById({ courseId });

  return modules;
});

export { getCourse, getModules };
