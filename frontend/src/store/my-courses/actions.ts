import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CourseGetMentoringDto,
  CourseGetResponseDto,
  CourseUpdateMentoringDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from 'common/types/types';

import { ActionType } from './common';

const getCoursesStudying = createAsyncThunk<
  EntityPagination<CourseGetResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_STUDYING_COURSES, async ({ count, page }, { extra }) => {
  const { coursesApi } = extra;
  const coursesStudying = await coursesApi.getAllCoursesStudying({
    count,
    page,
  });

  return coursesStudying;
});

const getCoursesMentoring = createAsyncThunk<
  EntityPagination<CourseGetMentoringDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORING_COURSES, async ({ count, page }, { extra }) => {
  const { coursesApi } = extra;

  const coursesMentoring = await coursesApi.getAllCoursesMentoring({
    count,
    page,
  });

  return coursesMentoring;
});

const updateCoursesMentoring = createAsyncThunk<
  CourseUpdateMentoringDto,
  CourseUpdateMentoringDto,
  AsyncThunkConfig
>(ActionType.UPDATE_MENTORING_COURSES, async (payload, { extra }) => {
  const { coursesApi, notification } = extra;
  await coursesApi.updateCoursesMentoring(payload);
  notification.success(NotificationMessage.COURSES_MENTORING_UPDATE);

  return payload;
});

export { getCoursesMentoring, getCoursesStudying, updateCoursesMentoring };
