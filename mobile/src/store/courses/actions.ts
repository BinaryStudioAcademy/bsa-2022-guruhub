import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  CourseFilteringDto,
  CourseGetResponseDto,
} from '~/common/types/courses/courses';
import { AsyncThunkConfig } from '~/common/types/types';

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
