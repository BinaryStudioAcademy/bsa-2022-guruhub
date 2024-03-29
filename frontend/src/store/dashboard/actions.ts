import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseCreateRequestDto,
  CourseFilteringWithPaginationDto,
  CourseGetResponseDto,
  EntityPagination,
} from 'common/types/types';

import { ActionType } from './common';

const getCourses = createAsyncThunk<
  EntityPagination<CourseGetResponseDto>,
  CourseFilteringWithPaginationDto,
  AsyncThunkConfig
>(
  ActionType.GET_COURSES,
  async ({ title, categoryKey, page, count }, { extra }) => {
    const { coursesApi } = extra;
    const courses = await coursesApi.getAllWithCategories({
      filtering: { title, categoryKey, page, count },
    });

    return courses;
  },
);

const getCategories = createAsyncThunk<
  CategoryGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_CATEGORIES, async (_, { extra }) => {
  const { categoriesApi } = extra;
  const categoriesDto = await categoriesApi.getAllWithCourses();

  return categoriesDto;
});

const addCourse = createAsyncThunk<
  CourseGetResponseDto,
  CourseCreateRequestDto,
  AsyncThunkConfig
>(ActionType.ADD_COURSE, async (createCoursePayload, { extra }) => {
  const { coursesApi, notification } = extra;
  const { url } = createCoursePayload;
  const course = await coursesApi.create(url);
  notification.success(NotificationMessage.COURSE_ADD);

  return course;
});

const getPopularCourses = createAsyncThunk<
  CourseGetResponseDto[],
  void,
  AsyncThunkConfig
>(ActionType.GET_POPULAR_COURSES, async (_, { extra }) => {
  const { coursesApi } = extra;

  const popularCourses = await coursesApi.getPopular();

  return popularCourses;
});

export { addCourse, getCategories, getCourses, getPopularCourses };
