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
  const { coursesManagementApi } = extra;

  const courses = await coursesManagementApi.getAllCourses({
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
  const { coursesManagementApi } = extra;
  const categoriesDto = await coursesManagementApi.getAllCategories();

  return categoriesDto;
});

export { getCategories, getCourses };
