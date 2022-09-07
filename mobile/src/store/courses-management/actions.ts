import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CourseGetResponseDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getCoursesWithCategory = createAsyncThunk<
  EntityPagination<CourseGetResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_COURSES_WITH_CATEGORY, async ({ count, page }, { extra }) => {
  const { coursesApi } = extra;
  const courses = await coursesApi.getAllWithCategory({ page, count });

  return courses;
});

export { getCoursesWithCategory };
