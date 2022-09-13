import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AppRoute,
  NotificationMessage,
  PermissionKey,
} from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseCheckIsMentorForMenteeRequestParamsDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
  CourseSelectMentorRequestParamsDto,
  CoursesToMentorsRequestDto,
  CourseUpdateCategoryRequestArguments,
  GetMentorRequestParamsDto,
  InterviewsCreateRequestBodyDto,
  MenteesToMentorsResponseDto,
  TasksGetByCourseIdAndMenteeIdRequestDto,
  TaskWithModuleResponseDto,
  UserDetailsResponseDto,
  UserWithPermissions,
} from 'common/types/types';
import { checkHasPermission } from 'helpers/helpers';

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
>(ActionType.CREATE_INTERVIEW, async (payload, { extra, dispatch }) => {
  const { interviewsApi, notification } = extra;

  await interviewsApi.create(payload);
  dispatch(getActiveInterviewsCategoryIdsByUserId(payload.intervieweeUserId));

  notification.success(NotificationMessage.INTERVIEW_CREATE);
});

const getMentor = createAsyncThunk<
  MenteesToMentorsResponseDto | null,
  GetMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MENTOR, async (payload, { extra }) => {
  const { mentorsApi } = extra;

  const menteeToMentor = await mentorsApi.getMentor(payload);

  return menteeToMentor;
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

const getActiveInterviewsCategoryIdsByUserId = createAsyncThunk<
  number[],
  number,
  AsyncThunkConfig
>(ActionType.GET_ACTIVE_INTERVIEW_CATEGORY_IDS, async (payload, { extra }) => {
  const { interviewsApi } = extra;

  const activeInterviewsCategoryIds =
    await interviewsApi.getActiveInterviewsCategoryIdsByUserId(payload);

  return activeInterviewsCategoryIds;
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

  const isMentor = await coursesApi.checkIsMentor({
    courseId: (course as CourseGetResponseDto).id,
  });

  const isMentorBecomingEnabled =
    (course as CourseGetResponseDto).courseCategoryId && !isMentor;

  return Boolean(isMentorBecomingEnabled);
});

const disableMentorBecoming = createAsyncThunk<boolean, void, AsyncThunkConfig>(
  ActionType.DISABLE_MENTOR_BECOMING,
  () => {
    return false;
  },
);

const disableMentorChoosing = createAction(ActionType.DISABLE_MENTOR_CHOOSING);

const cleanMentor = createAction(ActionType.CLEAN_MENTOR);

const cleanMentors = createAction(ActionType.CLEAN_MENTORS);

const getMentorsByCourseId = createAsyncThunk<
  UserDetailsResponseDto[],
  CourseGetMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORS, async (payload, { extra, getState }) => {
  const {
    course: { mentor },
  } = getState();
  const { coursesApi } = extra;
  const mentors = await coursesApi.getMentorsByCourseId(payload);

  if (mentor) {
    const availableMentors = mentors.filter((m: UserDetailsResponseDto) => {
      return m.id !== mentor.id;
    });

    return availableMentors;
  }

  return mentors;
});

const getMenteesByCourseId = createAsyncThunk<
  UserDetailsResponseDto[],
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(
  ActionType.GET_MENTOR_MENTEES,
  async (payload, { extra, dispatch, getState }) => {
    const { coursesApi } = extra;
    const {
      auth: { user },
    } = getState();
    const hasMentoringPermission = checkHasPermission({
      userPermissions: (user as UserWithPermissions).permissions,
      permissionKeys: [PermissionKey.MANAGE_MENTORING],
    });

    if (hasMentoringPermission) {
      await dispatch(checkIsMentor({ id: payload.id }));

      const {
        course: { isMentor },
      } = getState();

      if (!isMentor) {
        return [];
      }

      return coursesApi.getMenteesByCourseId(payload.id);
    }

    return [];
  },
);

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
  MenteesToMentorsResponseDto,
  CourseSelectMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHOOSE_A_MENTOR, async ({ id }, { extra, getState }) => {
  const {
    course: { course },
    auth: { user },
  } = getState();
  const { coursesApi, notification } = extra;

  const menteeToMentor = await coursesApi.chooseMentor({
    courseId: (course as CourseGetResponseDto).id,
    menteeId: (user as UserWithPermissions).id,
    mentorId: id,
  });

  notification.success(NotificationMessage.MENTOR_CHOOSE);

  return menteeToMentor;
});

const changeMentor = createAsyncThunk<
  MenteesToMentorsResponseDto,
  CourseSelectMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHANGE_A_MENTOR, async ({ id }, { extra, getState }) => {
  const {
    course: { course },
    auth: { user },
  } = getState();
  const { coursesApi, notification } = extra;

  const newMenteeToMentor = await coursesApi.changeMentor({
    courseId: (course as CourseGetResponseDto).id,
    menteeId: (user as UserWithPermissions).id,
    mentorId: id,
  });

  notification.success(NotificationMessage.MENTOR_CHANGE);

  return newMenteeToMentor;
});

const updateIsMentorChoosingEnabled = createAsyncThunk<
  boolean,
  number,
  AsyncThunkConfig
>(
  ActionType.SET_IS_MENTOR_CHOOSING_ENABLED,
  async (id, { extra, getState }) => {
    const {
      auth: { user },
      course: { mentors, course, activeInterviewsCategoryIds },
    } = getState();

    if (!course) {
      return false;
    }

    const { coursesApi } = extra;

    const isMentor = mentors.some(
      (mentor) => mentor.id === (user as UserWithPermissions).id,
    );
    const isInterviewProcessActive = activeInterviewsCategoryIds.some(
      (categoryId) => {
        return categoryId === (course as CourseGetResponseDto).courseCategoryId;
      },
    );

    const hasMentor = await coursesApi.checkHasMentor({
      courseId: id,
    });
    const hasCategory = Boolean(course.category);

    const canChooseMentor =
      !isMentor && !hasMentor && hasCategory && !isInterviewProcessActive;

    return canChooseMentor;
  },
);

const checkIsMentor = createAsyncThunk<
  boolean,
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHECK_IS_MENTOR, ({ id }, { extra }) => {
  const { coursesApi } = extra;

  return coursesApi.checkIsMentor({
    courseId: id,
  });
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
  const { coursesApi, notification } = extra;
  const updatedCourse = await coursesApi.updateCategory(payload);
  notification.success(NotificationMessage.COURSE_CATEGORY_UPDATED);

  return updatedCourse;
});

const getTasksByCourseIdAndMenteeId = createAsyncThunk<
  TaskWithModuleResponseDto[],
  TasksGetByCourseIdAndMenteeIdRequestDto,
  AsyncThunkConfig
>(
  ActionType.GET_MODULES_BY_COURSE_ID_AND_MENTEE_ID,
  async ({ courseId, menteeId }, { extra }) => {
    const { tasksApi } = extra;
    const modules = await tasksApi.getAllByCourseIdAndMenteeId({
      courseId,
      menteeId,
    });

    return modules;
  },
);

const checkIsMentorForMentee = createAsyncThunk<
  void,
  CourseCheckIsMentorForMenteeRequestParamsDto,
  AsyncThunkConfig
>(
  ActionType.CHECK_IS_MENTOR_FOR_MENTEE,
  async ({ courseId, menteeId }, { extra }) => {
    const { coursesApi, navigation, notification } = extra;

    try {
      const isMentorForMentee = await coursesApi.checkIsMentorForMentee({
        courseId,
        menteeId,
      });

      if (!isMentorForMentee) {
        notification.error(NotificationMessage.PERMISSION_DENIED);
        navigation.push(AppRoute.SIGN_IN);
      }
    } catch {
      navigation.push(AppRoute.SIGN_IN);
    }
  },
);

export {
  becomeAMentor,
  changeMentor,
  checkIsMentor,
  checkIsMentorForMentee,
  chooseMentor,
  cleanMentor,
  cleanMentors,
  createInterview,
  createMentor,
  disableMentorBecoming,
  disableMentorChoosing,
  getActiveInterviewsCategoryIdsByUserId,
  getCategories,
  getCourse,
  getMenteesByCourseId,
  getMentor,
  getMentorsByCourseId,
  getModules,
  getPassedInterviewsCategoryIdsByUserId,
  getTasksByCourseIdAndMenteeId,
  updateCategory,
  updateIsMentorBecomingEnabled,
  updateIsMentorChoosingEnabled,
};
