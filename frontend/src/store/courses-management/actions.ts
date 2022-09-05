import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  NotificationMessage,
  PaginationDefaultValue,
} from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseGetResponseDto,
  CourseUpdateCategoryRequestArguments,
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from 'common/types/types';
import { notification } from 'services/services';

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

const updateCategory = createAsyncThunk<
  void,
  CourseUpdateCategoryRequestArguments,
  AsyncThunkConfig
>(ActionType.UPDATE_CATEGORY, async (payload, { extra, dispatch }) => {
  const { coursesApi } = extra;
  await coursesApi.updateCategory(payload);
  notification.success(NotificationMessage.COURSE_CATEGORY_UPDATED);
  dispatch(
    getCourses({
      page: PaginationDefaultValue.DEFAULT_PAGE,
      count: PaginationDefaultValue.DEFAULT_COURSE_CATEGORIES_COUNT,
    }),
  );
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

export { getCategories, getCourses, updateCategory };
