import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  NotificationMessage,
  NotificationType,
} from '~/common/enums/notification/notification';
import {
  AsyncThunkConfig,
  CourseCreateRequestDto,
  CourseFilteringWithPaginationDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseSelectMentorRequestParamsDto,
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  CourseUpdateCategoryRequestArguments,
  EntityPagination,
  GetMentorRequestParamsDto,
  InterviewsCreateRequestBodyDto,
  MenteesToMentorsResponseDto,
  TasksGetByCourseIdAndMenteeIdRequestDto,
  TaskWithModuleResponseDto,
  UsersGetResponseDto,
  UserWithPermissions,
} from '~/common/types/types';
import { app, interviewsActions } from '~/store/actions';

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
>(ActionType.ADD_COURSE, async (payload, { extra, dispatch }) => {
  const { coursesApi } = extra;
  const { url } = payload;
  const course = await coursesApi.create(url);
  dispatch(
    app.notify({
      type: NotificationType.SUCCESS,
      message: NotificationMessage.COURSE_ADD,
    }),
  );

  return course;
});

const getMentorsByCourseId = createAsyncThunk<
  UsersGetResponseDto[],
  CourseGetMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORS, async (payload, { extra, getState }) => {
  const {
    courses: { mentor },
  } = getState();
  const { coursesApi } = extra;
  const mentors = await coursesApi.getMentorsByCourseId(payload);

  if (mentor) {
    const availableMentors = mentors.filter(({ id }) => {
      return id !== mentor.id;
    });

    return availableMentors;
  }

  return mentors;
});

const updateVisibilityBecomeMentor = createAsyncThunk<
  boolean,
  number,
  AsyncThunkConfig
>(
  ActionType.UPDATE_VISIBILITY_BECOME_MENTOR,
  async (userId, { extra, getState }) => {
    const {
      courses: { course },
    } = getState();

    const { coursesApi, interviewsApi } = extra;

    if (!course) {
      return false;
    }

    const isMentor = await coursesApi.checkIsMentor({
      courseId: course.id,
    });

    const activeInterviewsCategoryIds =
      await interviewsApi.getActiveInterviewsCategoryIdsByUserId(userId);

    const isMentorBecomingEnabled =
      course.courseCategoryId &&
      !isMentor &&
      !activeInterviewsCategoryIds.includes(course.courseCategoryId);

    return Boolean(isMentorBecomingEnabled);
  },
);

const setBecomeMentorInvisible = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.SET_BECOME_MENTOR_INVISIBLE, async () => {
  return false;
});

const createMentor = createAsyncThunk<
  CoursesToMentorsResponseDto,
  CoursesToMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_MENTOR, async (payload, { extra }) => {
  const { mentorsApi } = extra;

  return mentorsApi.create(payload);
});

const becomeMentor = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.BECOME_MENTOR,
  async (_, { dispatch, getState, extra }) => {
    const {
      courses: { course },
      auth: { user },
    } = getState();

    const { interviewsApi } = extra;

    if (!user || !course) {
      return;
    }

    const passedCategoryInterviews =
      await interviewsApi.getPassedInterviewCategoryIds(user.id);
    const isCategoryPassed = passedCategoryInterviews.includes(
      course.courseCategoryId,
    );

    if (isCategoryPassed) {
      const payload: CoursesToMentorsRequestDto = {
        userId: user.id,
        courseId: course.id,
      };
      await dispatch(createMentor(payload)).unwrap();
      dispatch(setBecomeMentorInvisible());
      dispatch(
        app.notify({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.MENTOR_ADD_SUCCESS,
        }),
      );
    } else {
      const payload: InterviewsCreateRequestBodyDto = {
        intervieweeUserId: user.id,
        categoryId: course.courseCategoryId,
      };
      await dispatch(interviewsActions.createInterview(payload)).unwrap();
      dispatch(setBecomeMentorInvisible());
    }
  },
);

const updateCategory = createAsyncThunk<
  CourseGetResponseDto,
  CourseUpdateCategoryRequestArguments,
  AsyncThunkConfig
>(ActionType.UPDATE_CATEGORY, async (payload, { dispatch, extra }) => {
  const { coursesApi } = extra;
  const updatedCourse = await coursesApi.updateCategory(payload);
  dispatch(
    app.notify({
      type: NotificationType.SUCCESS,
      message: NotificationMessage.EDIT_CATEGORY_SUCCESS,
    }),
  );

  return updatedCourse;
});

const chooseMentor = createAsyncThunk<
  MenteesToMentorsResponseDto,
  CourseSelectMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHOOSE_A_MENTOR, async ({ id }, { extra, getState }) => {
  const {
    courses: { course },
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

const updateIsMentorChoosingEnabled = createAsyncThunk<
  boolean,
  number,
  AsyncThunkConfig
>(
  ActionType.SET_IS_MENTOR_CHOOSING_ENABLED,
  async (id, { extra, getState }) => {
    const {
      auth: { user },
      courses: { mentors },
    } = getState();

    const isMentor = mentors.some(
      (mentor) => mentor.id === (user as UserWithPermissions).id,
    );
    const hasMentor = await extra.coursesApi.checkHasMentor({
      courseId: id,
    });

    const canChooseMentor = !isMentor && !hasMentor;

    return canChooseMentor;
  },
);

const getMenteesMentor = createAsyncThunk<
  MenteesToMentorsResponseDto | null,
  GetMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MENTEES_MENTOR, async (payload, { extra }) => {
  const { mentorsApi } = extra;
  const mentor = await mentorsApi.getMenteesMentor(payload);

  return mentor;
});

const getMenteesByCourseId = createAsyncThunk<
  UsersGetResponseDto[],
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MENTEES, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const mentees = coursesApi.getMenteesByCourseId(payload.id);

  return mentees;
});

const checkIsMentor = createAsyncThunk<
  boolean,
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHECK_IS_MENTOR, ({ id }, { extra }) => {
  const { coursesApi } = extra;
  const isMentor = coursesApi.checkIsMentor({
    courseId: id,
  });

  return isMentor;
});

const changeMentor = createAsyncThunk<
  MenteesToMentorsResponseDto,
  CourseSelectMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHANGE_A_MENTOR, async ({ id }, { extra, getState, dispatch }) => {
  const {
    courses: { course },
    auth: { user },
  } = getState();
  const { coursesApi } = extra;

  const newMenteeToMentor = await coursesApi.changeMentor({
    courseId: (course as CourseGetResponseDto).id,
    menteeId: (user as UserWithPermissions).id,
    mentorId: id,
  });

  dispatch(
    app.notify({
      type: NotificationType.SUCCESS,
      message: NotificationMessage.UPDATE_SUCCESS,
    }),
  );

  return newMenteeToMentor;
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

const clearMentor = createAction(ActionType.CLEAR_MENTOR);
const clearTasks = createAction(ActionType.CLEAR_TASKS);

const addCurrentMenteeId = createAction<number>(
  ActionType.ADD_CURRENT_MENTEE_ID,
);
const clearCurrentMenteeId = createAction(ActionType.CLEAR_CURRENT_MENTEE_ID);

export {
  addCourse,
  addCurrentMenteeId,
  becomeMentor,
  changeMentor,
  checkIsMentor,
  chooseMentor,
  clearCurrentMenteeId,
  clearMentor,
  clearTasks,
  createMentor,
  getCourse,
  getCourses,
  getMenteesByCourseId,
  getMenteesMentor,
  getMentorsByCourseId,
  getTasksByCourseIdAndMenteeId,
  setBecomeMentorInvisible,
  updateCategory,
  updateIsMentorChoosingEnabled,
  updateVisibilityBecomeMentor,
};
