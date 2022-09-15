import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
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
  CourseGetResponseDto,
  CourseUpdateCategoryRequestArguments,
  AsyncThunkConfig
>(ActionType.UPDATE_CATEGORY, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const result = await coursesApi.updateCategory(payload);
  notification.success(NotificationMessage.COURSE_CATEGORY_UPDATED);

  return result;
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
