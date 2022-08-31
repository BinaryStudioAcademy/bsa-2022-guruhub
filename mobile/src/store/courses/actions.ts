import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CourseFilteringDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  UserDetailsResponseDto,
} from '~/common/types/types';
import { CourseCreateRequestDto } from '~/components/courses/components/add-course/common/constants/constants';

import { ActionType } from './common';

const getCourses = createAsyncThunk<
  CourseGetResponseDto[],
  CourseFilteringDto,
  AsyncThunkConfig
>(ActionType.GET_COURSES, async ({ title, categoryKey }, { extra }) => {
  const { coursesApi } = extra;
  const courses = await coursesApi.getAll({
    filtering: { title, categoryKey },
  });

  return courses;
});

const getCourse = createAsyncThunk<
  CourseGetResponseDto,
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_COURSE, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const { id } = payload;
  const course = await coursesApi.getById({ id });

  return course;
});

const addCourse = createAsyncThunk<
  CourseGetResponseDto,
  CourseCreateRequestDto,
  AsyncThunkConfig
>(ActionType.ADD_COURSE, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const { url } = payload;
  const course = await coursesApi.create(url);

  return course;
});

const getMentorsByCourseId = createAsyncThunk<
  UserDetailsResponseDto[],
  CourseGetMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORS, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const mentors = await coursesApi.getMentorsByCourseId(payload);

  return mentors;
});

const updateVisibilityBecomeMentor = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.UPDATE_VISIBILITY_BECOME_MENTOR, async (_, { getState }) => {
  const {
    auth: { user },
    courses: { mentors },
  } = getState();

  return !mentors.some((mentor) => mentor.id === user?.id);
});

const setBecomeMentorInvisible = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.SET_BECOME_MENTOR_INVISIBLE, async () => {
  return false;
});

export {
  addCourse,
  getCourse,
  getCourses,
  getMentorsByCourseId,
  setBecomeMentorInvisible,
  updateVisibilityBecomeMentor,
};
