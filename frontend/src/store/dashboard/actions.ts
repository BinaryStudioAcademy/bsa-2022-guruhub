import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseCreateRequestDto,
  CourseFilteringDto,
  CourseGetResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getCourses = createAsyncThunk<
  CourseGetResponseDto[],
  CourseFilteringDto,
  AsyncThunkConfig
>(ActionType.GET_COURSES, async ({ title, categoryKey }, { extra }) => {
  const { coursesApi } = extra;
  const courses = await coursesApi.getAllWithCategories({
    filtering: { title, categoryKey },
  });

  return courses;
});

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

export { addCourse, getCategories, getCourses };
