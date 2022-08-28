import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
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

export { getCourseModules };
