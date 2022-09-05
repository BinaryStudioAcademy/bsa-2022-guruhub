import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseGetResponseDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from 'common/types/types';

import { ActionType } from './common';

const getCourses = createAsyncThunk<
  EntityPagination<CourseGetResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_COURSES, async ({ count, page }, { extra }) => {
  const { coursesApi } = extra;

  const courses = await coursesApi.getAll({
    count,
    page,
  });

  return courses;
});

const getCategories = createAsyncThunk<
  CategoryGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_CATEGORIES, async (_, { extra }) => {
  const { categoriesApi } = extra;
  const categoriesDto = await categoriesApi.getAll();

  return categoriesDto;
});

export { getCategories, getCourses };
