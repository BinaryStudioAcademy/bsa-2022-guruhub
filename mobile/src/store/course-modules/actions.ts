import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CourseModulesGetAllResponseDto,
  CourseModulesGetRequestDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getCourseModules = createAsyncThunk<
  CourseModulesGetAllResponseDto,
  CourseModulesGetRequestDto,
  AsyncThunkConfig
>(ActionType.GET_COURSE_MODULES, async ({ courseId }, { extra }) => {
  const { courseModulesApi } = extra;
  const courseModules = await courseModulesApi.getAll({ courseId });

  return courseModules;
});

export { getCourseModules };
