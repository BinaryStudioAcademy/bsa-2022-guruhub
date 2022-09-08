import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CourseGetMentoringDto,
  CourseGetResponseDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from 'common/types/types';

import { ActionType } from './common';

const getCoursesStudying = createAsyncThunk<
  CourseGetResponseDto[],
  void,
  AsyncThunkConfig
>(ActionType.GET_STUDYING_COURSES, async (_, { extra }) => {
  const { coursesApi } = extra;
  const coursesStudying = await coursesApi.getAllCoursesStudying();

  return coursesStudying;
});

const getCoursesMentoring = createAsyncThunk<
  EntityPagination<CourseGetMentoringDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORING_COURSES, async ({ count, page }, { extra }) => {
  const { coursesApi } = extra;

  const coursesMentoring = await coursesApi.getAllCoursesMentoring({
    count,
    page,
  });

  return coursesMentoring;
});

export { getCoursesMentoring, getCoursesStudying };
