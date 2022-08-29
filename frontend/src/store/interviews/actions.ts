import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  InterviewsGetAllItemResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getInterviews = createAsyncThunk<
  EntityPagination<InterviewsGetAllItemResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_INTERVIEWS, async ({ count, page }, { extra }) => {
  const { interviewsApi } = extra;

  const interviews = await interviewsApi.getAll({ count, page });

  return interviews;
});

export { getInterviews };
