import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  NotificationMessage,
  NotificationType,
} from '~/common/enums/notification/notification';
import {
  AsyncThunkConfig,
  CourseCreateRequestDto,
  CourseFilteringDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  InterviewsCreateRequestBodyDto,
  UserDetailsResponseDto,
} from '~/common/types/types';
import { notify } from '~/store/app/actions';
import {
  createInterview,
  getPassedInterviewCategoryIds,
} from '~/store/interviews/actions';

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
  async (_, { dispatch, getState }) => {
    const {
      courses: { course },
      auth: { user },
    } = getState();

    if (!user || !course) {
      return;
    }

    const passedCategoryInterviews = await dispatch(
      getPassedInterviewCategoryIds(user.id),
    );
    const isCategoryPassed = (
      passedCategoryInterviews.payload as number[]
    ).includes(course.courseCategoryId);

    if (isCategoryPassed) {
      const payload: CoursesToMentorsRequestDto = {
        userId: user.id,
        courseId: course.id,
      };
      dispatch(createMentor(payload))
        .then(() => {
          dispatch(setBecomeMentorInvisible());
        })
        .then(() => {
          dispatch(
            notify({
              type: NotificationType.SUCCESS,
              message: NotificationMessage.MENTOR_ADD,
            }),
          );
        });
    } else {
      const payload: InterviewsCreateRequestBodyDto = {
        intervieweeUserId: user.id,
        categoryId: course.courseCategoryId,
      };
      dispatch(createInterview(payload));
    }
  },
);

export {
  addCourse,
  becomeMentor,
  createMentor,
  getCourse,
  getCourses,
  getMentorsByCourseId,
  setBecomeMentorInvisible,
  updateVisibilityBecomeMentor,
};
