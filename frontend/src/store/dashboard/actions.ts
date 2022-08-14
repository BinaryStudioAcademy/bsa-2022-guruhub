import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CourseCreateRequestDto,
  CourseGetResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const addCourse = createAsyncThunk<
  CourseGetResponseDto,
  CourseCreateRequestDto,
  AsyncThunkConfig
>(ActionType.ADD_COURSE, async (createCoursePayload, { extra }) => {
  const { coursesApi } = extra;
  const { url } = createCoursePayload;
  const course = await coursesApi.create(url);

  return course;
});

export { addCourse };
