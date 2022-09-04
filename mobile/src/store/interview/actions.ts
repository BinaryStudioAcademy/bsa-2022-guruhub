import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  EntityPagination,
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsGetInterviewersByCategoryRequestDto,
  InterviewsGetOtherItemResponseDto,
  InterviewsGetOtherRequestDto,
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

const getOtherByInterviewId = createAsyncThunk<
  EntityPagination<InterviewsGetOtherItemResponseDto>,
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

export {
  getInterview,
  getInterviewersByCategory,
  getOtherByInterviewId,
  updateInterview,
};
