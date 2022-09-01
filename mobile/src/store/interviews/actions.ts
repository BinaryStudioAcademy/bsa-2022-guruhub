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

export { getInterviews };
