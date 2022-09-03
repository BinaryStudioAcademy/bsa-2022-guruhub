import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsGetInterviewersByCategoryRequestDto,
  InterviewsUpdateRequestParamsDto,
  InterviewUpdateRequestArgumentsDto,
} from '~/common/types/types';

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

const getInterviewersByCategory = createAsyncThunk<
  InterviewsGetInterviewerResponseDto[],
  InterviewsGetInterviewersByCategoryRequestDto,
  AsyncThunkConfig
>(ActionType.GET_INTERVIEWERS, async (request, { extra }) => {
  const { interviewsApi } = extra;
  const interview = await interviewsApi.getInterviewersByCategory(
    request.categoryId,
  );

  return interview;
});

const updateInterview = createAsyncThunk<
  InterviewsGetAllItemResponseDto,
  InterviewUpdateRequestArgumentsDto,
  AsyncThunkConfig
>(ActionType.UPDATE_INTERVIEW, async (updateInterviewPayload, { extra }) => {
  const { interviewsApi } = extra;
  const interview = await interviewsApi.update(updateInterviewPayload);

  return interview;
});

export { getInterview, getInterviewersByCategory, updateInterview };
