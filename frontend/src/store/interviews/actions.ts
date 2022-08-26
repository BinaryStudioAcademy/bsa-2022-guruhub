import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  InterviewsGetAllResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getInterviews = createAsyncThunk<
  InterviewsGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_INTERVIEWS, async (_, { extra }) => {
  const { interviewsApi } = extra;
  const interviews = await interviewsApi.getAll();

  return interviews;
});

export { getInterviews };
