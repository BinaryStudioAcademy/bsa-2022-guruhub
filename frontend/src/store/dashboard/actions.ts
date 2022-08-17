import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseCreateRequestDto,
  CourseGetResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getCourses = createAsyncThunk<
  CourseGetResponseDto[],
  void,
  AsyncThunkConfig
>(ActionType.GET_COURSES, async (_request, { extra }) => {
  const { coursesApi } = extra;
  const courses = await coursesApi.getAll();

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

const addCourse = createAsyncThunk<
  CourseGetResponseDto,
  CourseCreateRequestDto,
  AsyncThunkConfig
>(ActionType.ADD_COURSE, async (createCoursePayload, { extra }) => {
  const { coursesApi } = extra;
  const { url } = createCoursePayload;
  const course = await coursesApi.create(url);

  return course;
});

export { addCourse, getCategories, getCourses };
