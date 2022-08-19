import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CourseFilteringDto,
  CourseGetResponseDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getCourses = createAsyncThunk<
  CourseGetResponseDto[],
  CourseFilteringDto,
  AsyncThunkConfig
>(ActionType.GET_COURSES, async ({ title, categoryKey }, { extra }) => {
  const { coursesApi } = extra;
  const courses = await coursesApi.getAll({
    filtering: { title, categoryKey },
  });

  return courses;
});

export { getCourses };
