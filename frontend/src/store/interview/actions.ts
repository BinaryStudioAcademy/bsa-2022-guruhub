import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  InterviewsGetAllItemResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getOtherByInterviewId = createAsyncThunk<
  InterviewsGetAllItemResponseDto[],
  number,
  AsyncThunkConfig
>(ActionType.GET_OTHER_INTERVIEWS, async (id, { extra }) => {
  const { interviewsApi } = extra;
  const otherInterviews = await interviewsApi.getOtherByInterviewId(id);

  return otherInterviews;
});

export { getOtherByInterviewId };
