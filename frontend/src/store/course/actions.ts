import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
  CourseSelectMentorRequestParamsDto,
  CoursesToMentorsRequestDto,
  CourseUpdateCategoryRequestArguments,
  InterviewsCreateRequestBodyDto,
  UserDetailsResponseDto,
  UserWithPermissions,
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
>(ActionType.SET_IS_MENTOR_BECOMING_ENABLED, async (_, { extra, getState }) => {
  const {
    course: { course },
  } = getState();

  const { coursesApi } = extra;

  const isMentorCheck = await coursesApi.checkIsMentor({
    courseId: (course as CourseGetResponseDto).id,
  });

  const isMentorBecomingEnabled =
    (course as CourseGetResponseDto).courseCategoryId && !isMentorCheck;

  return Boolean(isMentorBecomingEnabled);
});

const disableMentorBecoming = createAsyncThunk<boolean, void, AsyncThunkConfig>(
  ActionType.DISABLE_MENTOR_BECOMING,
  () => {
    return false;
  },
);

const getMentorsByCourseId = createAsyncThunk<
  UserDetailsResponseDto[],
  CourseGetMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORS, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const mentors = await coursesApi.getMentorsByCourseId(payload);

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

const chooseMentor = createAsyncThunk<
  void,
  CourseSelectMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHOOSE_A_MENTOR, async ({ id }, { extra, getState }) => {
  const {
    course: { course },
    auth: { user },
  } = getState();
  const { coursesApi } = extra;

  await coursesApi.chooseMentor({
    courseId: (course as CourseGetResponseDto).id,
    menteeId: (user as UserWithPermissions).id,
    mentorId: id,
  });

  notification.success(NotificationMessage.MENTOR_CHOOSE);

  return;
});

const updateIsMentorChoosingEnabled = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.SET_IS_MENTOR_CHOOSING_ENABLED, async (_, { extra, getState }) => {
  const {
    course: { course },
  } = getState();

  const { coursesApi } = extra;

  const isMentorCheck = await coursesApi.checkIsMentor({
    courseId: (course as CourseGetResponseDto).id,
  });
  const hasMentorCheck = await coursesApi.checkHasMentor({
    courseId: (course as CourseGetResponseDto).id,
  });
  const isMentorChoosingEnabled = isMentorCheck || hasMentorCheck;

  return !isMentorChoosingEnabled;
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
  chooseMentor,
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
  updateIsMentorChoosingEnabled,
};
