import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
  CoursesToMentorsRequestDto,
  InterviewsCreateRequestBodyDto,
} from 'common/types/types';

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

const getPendingOrPassedInterviewsCategoryIdsByUserId = createAsyncThunk<
  number[],
  number,
  AsyncThunkConfig
>(
  ActionType.GET_PENDING_OR_PASSED_INTERVIEW_CATEGORY_IDS,
  async (payload, { extra }) => {
    const { interviewsApi } = extra;

    const pendingOrPassedInterviewsCategoryIds =
      await interviewsApi.getPendingOrPassedInterviewsCategoryIdsByUserId(
        payload,
      );

    return pendingOrPassedInterviewsCategoryIds;
  },
);

const setIsMentorButtonVisible = createAsyncThunk<
  boolean,
  boolean,
  AsyncThunkConfig
>(ActionType.SET_IS_MENTOR_BUTTON_VISIBLE, async (payload) => {
  return payload;
});

export {
  createInterview,
  createMentor,
  getCourse,
  getModules,
  getPendingOrPassedInterviewsCategoryIdsByUserId,
  setIsMentorButtonVisible,
};
