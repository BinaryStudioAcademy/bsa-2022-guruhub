import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
  CoursesToMentorsRequestDto,
  CourseUpdateCategoryRequestArguments,
  InterviewsCreateRequestBodyDto,
  UsersGetResponseDto,
} from 'common/types/types';
import { notification } from 'services/services';

import { ActionType } from './common';

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

const getModules = createAsyncThunk<
  CourseModulesGetAllResponseDto,
  CourseModulesGetAllRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MODULES, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const { courseId } = payload;

  const modules = await coursesApi.getCourseModulesById({ courseId });

  return modules;
});

const createInterview = createAsyncThunk<
  void,
  InterviewsCreateRequestBodyDto,
  AsyncThunkConfig
>(ActionType.CREATE_INTERVIEW, async (payload, { extra }) => {
  const { interviewsApi, notification } = extra;

  await interviewsApi.create(payload);

  notification.success(NotificationMessage.INTERVIEW_CREATE);
});

const createMentor = createAsyncThunk<
  void,
  CoursesToMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_MENTOR, async (payload, { extra }) => {
  const { mentorsApi, notification } = extra;

  await mentorsApi.create(payload);

  notification.success(NotificationMessage.MENTOR_ADD);
});

const getPassedInterviewsCategoryIdsByUserId = createAsyncThunk<
  number[],
  number,
  AsyncThunkConfig
>(ActionType.GET_PASSED_INTERVIEW_CATEGORY_IDS, async (payload, { extra }) => {
  const { interviewsApi } = extra;

  const passedInterviewsCategoryIds =
    await interviewsApi.getPassedInterviewsCategoryIdsByUserId(payload);

  return passedInterviewsCategoryIds;
});

const updateIsMentorBecomingEnabled = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.SET_IS_MENTOR_BECOMING_ENABLED, (_, { getState }) => {
  const {
    auth: { user },
    course: { course, mentors },
  } = getState();

  const isMentorBecomingEnabled =
    course?.courseCategoryId &&
    !mentors.some((mentor) => mentor.id === user?.id);

  return Boolean(isMentorBecomingEnabled);
});

const disableMentorBecoming = createAsyncThunk<boolean, void, AsyncThunkConfig>(
  ActionType.DISABLE_MENTOR_BECOMING,
  () => {
    return false;
  },
);

const getMentorsByCourseId = createAsyncThunk<
  UsersGetResponseDto[],
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORS, async ({ id }, { extra }) => {
  const { coursesApi } = extra;
  const mentors = await coursesApi.getMentorsByCourseId({ id });

  return mentors;
});

const becomeAMentor = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.BECOME_A_MENTOR,
  (_, { dispatch, getState }) => {
    const {
      course: { passedInterviewsCategoryIds, course },
      auth: { user },
    } = getState();

    if (!user || !course) {
      return;
    }

    const isInterviewPassed = passedInterviewsCategoryIds.includes(
      course.courseCategoryId,
    );

    if (isInterviewPassed) {
      dispatch(createMentor({ courseId: course.id, userId: user.id }));

      return;
    }

    dispatch(
      createInterview({
        categoryId: course.courseCategoryId,
        intervieweeUserId: user.id,
      }),
    );
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

const updateCategory = createAsyncThunk<
  CourseGetResponseDto,
  CourseUpdateCategoryRequestArguments,
  AsyncThunkConfig
>(ActionType.UPDATE_CATEGORY, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const updatedCourse = await coursesApi.updateCategory(payload);
  notification.success(NotificationMessage.COURSE_CATEGORY_UPDATED);

  return updatedCourse;
});

export {
  becomeAMentor,
  createInterview,
  createMentor,
  disableMentorBecoming,
  getCategories,
  getCourse,
  getMentorsByCourseId,
  getModules,
  getPassedInterviewsCategoryIdsByUserId,
  updateCategory,
  updateIsMentorBecomingEnabled,
};
