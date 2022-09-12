import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

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

const setNavigateFromCoursesManagement = createAction(
  ActionType.SET_NAVIGATE_FROM_COURSES_MANAGEMENT,
);

const unsetNavigateFromCoursesManagement = createAction(
  ActionType.UNSET_NAVIGATE_FROM_COURSES_MANAGEMENT,
);

export {
  getCoursesWithCategory,
  setNavigateFromCoursesManagement,
  unsetNavigateFromCoursesManagement,
};
