import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  EntityPagination,
  InterviewsGetAllItemResponseDto,
  InterviewsGetOtherRequestDto,
} from 'common/types/types';

import { ActionType } from './common';

const getOtherByInterviewId = createAsyncThunk<
  EntityPagination<InterviewsGetAllItemResponseDto>,
  InterviewsGetOtherRequestDto,
  AsyncThunkConfig
>(
  ActionType.GET_OTHER_INTERVIEWS,
  async ({ interviewId, count, page }, { extra }) => {
    const { interviewsApi } = extra;
    const otherInterviews = await interviewsApi.getOtherByInterviewId({
      interviewId,
      count,
      page,
    });

    return otherInterviews;
  },
);

export { getOtherByInterviewId };
