import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
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

export { getCourseModules, getModuleById };
