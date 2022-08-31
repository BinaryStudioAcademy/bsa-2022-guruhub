import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  InterviewsGetAllItemResponseDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getInterviews = createAsyncThunk<
  EntityPagination<InterviewsGetAllItemResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_INTERVIEWS, async ({ page, count }, { extra }) => {
  const { interviewersApi } = extra;

  return interviewersApi.getPage({ page, count });
});

const createInterview = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.CREATE_INTERVIEW,
  async (_, { extra, getState }) => {
    const {
      courses: { course },
      auth: { user },
    } = getState();
    const { interviewersApi } = extra;

    if (!user || !course) {
      return;
    }

    await interviewersApi.createInterview({
      intervieweeUserId: user.id,
      categoryId: course.courseCategoryId,
    });
    //todo notify
  },
);

const getPassedInterviewCategoryIds = createAsyncThunk<
  number[],
  number,
  AsyncThunkConfig
>(ActionType.GET_PASSED_INTERVIEW_CATEGORY_IDS, async (payload, { extra }) => {
  const { interviewersApi } = extra;

  return interviewersApi.getPassedInterviewCategoryIds(payload);
});

export { createInterview, getInterviews, getPassedInterviewCategoryIds };
