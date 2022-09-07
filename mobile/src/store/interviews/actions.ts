import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  NotificationMessage,
  NotificationType,
} from '~/common/enums/notification/notification';
import {
  AsyncThunkConfig,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  InterviewsCreateRequestBodyDto,
  InterviewsGetAllItemResponseDto,
} from '~/common/types/types';
import { app } from '~/store/actions';

import { ActionType } from './common';

const getInterviews = createAsyncThunk<
  EntityPagination<InterviewsGetAllItemResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_INTERVIEWS, async ({ page, count }, { extra }) => {
  const { interviewsApi } = extra;

  return interviewsApi.getPage({ page, count });
});

const createInterview = createAsyncThunk<
  void,
  InterviewsCreateRequestBodyDto,
  AsyncThunkConfig
>(ActionType.CREATE_INTERVIEW, async (payload, { extra, dispatch }) => {
  const { interviewsApi } = extra;

  await interviewsApi.createInterview(payload);
  dispatch(
    app.notify({
      type: NotificationType.SUCCESS,
      message: NotificationMessage.INTERVIEW_CREATE_SUCCESS,
    }),
  );
});

const getPassedInterviewCategoryIds = createAsyncThunk<
  number[],
  number,
  AsyncThunkConfig
>(ActionType.GET_PASSED_INTERVIEW_CATEGORY_IDS, async (payload, { extra }) => {
  const { interviewsApi } = extra;

  return interviewsApi.getPassedInterviewCategoryIds(payload);
});

export { createInterview, getInterviews, getPassedInterviewCategoryIds };
