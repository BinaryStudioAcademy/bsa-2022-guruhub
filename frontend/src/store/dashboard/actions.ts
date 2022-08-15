import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, CourseGetResponseDto } from 'common/types/types';

import { ActionType } from './common';

const getCourses = createAsyncThunk<
  CourseGetResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_COURSES, async (_request, { extra }) => {
  const { coursesApi } = extra;
  const courses = await coursesApi.getAll();

  return courses;
});

export { getCourses };
