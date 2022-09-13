import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseGetResponseDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getAllWithCategories = createAsyncThunk<
  EntityPagination<CourseGetResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(
  ActionType.GET_COURSES_WITH_CATEGORIES,
  async ({ count, page }, { extra }) => {
    const { coursesApi } = extra;
    const courses = await coursesApi.getAllWithCategories({ page, count });

    return courses;
  },
);

const getCategories = createAsyncThunk<
  CategoryGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_CATEGORIES, async (_, { extra }) => {
  const { categoriesApi } = extra;
  const categoriesDto = await categoriesApi.getAll();

  return categoriesDto;
});

export { getAllWithCategories, getCategories };
