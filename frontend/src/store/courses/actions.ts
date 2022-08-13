import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CourseCreateByUrlRequestDto,
  CourseGetResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const addCourse = createAsyncThunk<
  CourseGetResponseDto,
  CourseCreateByUrlRequestDto,
  AsyncThunkConfig
>(ActionType.ADD_COURSE, async (createCoursePayload, { extra }) => {
  const { coursesApi } = extra;
  const { url } = createCoursePayload;
  const course = await coursesApi.addCourse(url);

  return course;
});

export { addCourse };
