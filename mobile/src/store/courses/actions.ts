import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  CourseFilteringDto,
  CourseGetResponseDto,
} from '~/common/types/courses/courses';
import { AsyncThunkConfig } from '~/common/types/types';

import { ActionType } from './common';

type PayloadType = {
  payload?: CourseFilteringDto;
};

const getCourses = createAsyncThunk<
  CourseGetResponseDto[],
  PayloadType,
  AsyncThunkConfig
>(ActionType.GET_COURSES, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const courses = await coursesApi.getAll(payload);

  return courses;
});

export { getCourses };
