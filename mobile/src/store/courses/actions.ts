import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  CourseFilteringDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseSelectMentorRequestParamsDto,
  CourseUpdateCategoryRequestArguments,
  UserDetailsResponseDto,
  UserWithPermissions,
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

const updateCategory = createAsyncThunk<
  CourseGetResponseDto,
  CourseUpdateCategoryRequestArguments,
  AsyncThunkConfig
>(ActionType.UPDATE_CATEGORY, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const updatedCourse = await coursesApi.updateCategory(payload);

  return updatedCourse;
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

const chooseMentor = createAsyncThunk<
  void,
  CourseSelectMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHOOSE_A_MENTOR, async ({ id }, { extra, getState }) => {
  const {
    courses: { course },
    auth: { user },
  } = getState();
  const { coursesApi } = extra;

  await coursesApi.chooseMentor({
    courseId: (course as CourseGetResponseDto).id,
    menteeId: (user as UserWithPermissions).id,
    mentorId: id,
  });

  return;
});

const updateisMentorChoosingEnabled = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.SET_IS_MENTOR_CHOOSING_ENABLED, (_, { getState }) => {
  const {
    auth: { user },
    courses: { mentors },
  } = getState();

  const isMentorCheck = mentors.some(
    (mentor) => mentor.id === (user as UserWithPermissions).id,
  );

  return !isMentorCheck;
});

export {
  addCourse,
  chooseMentor,
  getCourse,
  getCourses,
  getMentorsByCourseId,
  updateCategory,
  updateisMentorChoosingEnabled,
};
