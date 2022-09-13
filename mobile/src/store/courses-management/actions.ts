import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
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

const setNavigateFromCoursesManagement = createAction(
  ActionType.SET_NAVIGATE_FROM_COURSES_MANAGEMENT,
);

const unsetNavigateFromCoursesManagement = createAction(
  ActionType.UNSET_NAVIGATE_FROM_COURSES_MANAGEMENT,
);

export {
  getAllWithCategories,
  setNavigateFromCoursesManagement,
  unsetNavigateFromCoursesManagement,
};
