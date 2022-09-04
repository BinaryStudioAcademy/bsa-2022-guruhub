import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CourseGetResponseDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from 'common/types/types';

import { ActionType } from './common';

const getCourseCategories = createAsyncThunk<
  EntityPagination<CourseGetResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_COURSE_CATEGORIES, async ({ count, page }, { extra }) => {
  const { courseCategoriesApi } = extra;

  const courseCategories = await courseCategoriesApi.getAll({ count, page });

  return courseCategories;
});

export { getCourseCategories };
