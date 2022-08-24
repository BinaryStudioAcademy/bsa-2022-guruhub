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
>(ActionType.GET_INTERVIEWS, async (_payload, { extra }) => {
  const { interviewApi } = extra;
  const interviews = await interviewApi.getAll();

  return interviews;
});

export { getInterviews };
