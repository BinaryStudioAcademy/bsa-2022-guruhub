import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  InterviewsGetAllItemResponseDto,
  InterviewsUpdateRequestParamsDto,
} from 'common/types/types';

import { ActionType } from './common';

const getInterview = createAsyncThunk<
  InterviewsGetAllItemResponseDto,
  InterviewsUpdateRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_INTERVIEW, async (request, { extra }) => {
  const { interviewsApi } = extra;
  const interview = await interviewsApi.getById(request.id);

  return interview;
});

export { getInterview };
