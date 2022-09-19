import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage, PermissionKey } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  EntityPagination,
  InterviewNoteCreateDto,
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteGetAllResponseDto,
  InterviewNoteGetRequestArgumentsDto,
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsGetInterviewersByCategoryRequestDto,
  InterviewsGetOtherItemResponseDto,
  InterviewsGetOtherRequestDto,
  InterviewsUpdateRequestParamsDto,
  InterviewUpdateRequestArgumentsDto,
  UserWithPermissions,
} from 'common/types/types';
import { checkHasPermission } from 'helpers/helpers';

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
>(
  ActionType.UPDATE_INTERVIEW,
  async (updateInterviewPayload, { getState, extra }) => {
    const { interviewsApi, notification } = extra;
    const { id, payload } = updateInterviewPayload;
    const { interviewDate, status } = payload;
    const {
      auth: { user },
    } = getState();

    const hasInterviewsPermission = checkHasPermission({
      permissionKeys: [PermissionKey.MANAGE_INTERVIEWS],
      userPermissions: (user as UserWithPermissions).permissions,
    });

    if (!hasInterviewsPermission) {
      const interview = await interviewsApi.updateWithoutInterviewer({
        id,
        payload: { interviewDate, status },
      });
      notification.success(NotificationMessage.INTERVIEW_UPDATE);

      return interview;
    }

    const interview = await interviewsApi.update({
      id,
      payload,
    });
    notification.success(NotificationMessage.INTERVIEW_UPDATE);

    return interview;
  },
);

const getNotes = createAsyncThunk<
  InterviewNoteGetAllResponseDto,
  InterviewNoteGetRequestArgumentsDto,
  AsyncThunkConfig
>(ActionType.GET_NOTES, async (payload, { extra }) => {
  const { interviewsApi } = extra;
  const { interviewId } = payload;

  const notesPayload = await interviewsApi.getAllNotes({ interviewId });

  return notesPayload;
});

const createNote = createAsyncThunk<
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteCreateDto,
  AsyncThunkConfig
>(ActionType.CREATE_NOTE, async (payload, { extra }) => {
  const { interviewsApi } = extra;
  const { interviewId, note } = payload;

  const newNote = await interviewsApi.createNote({ interviewId, note });

  return newNote;
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

const cleanInterview = createAction(ActionType.CLEAN_INTERVIEW);

export {
  cleanInterview,
  createNote,
  getInterview,
  getInterviewersByCategory,
  getNotes,
  getOtherByInterviewId,
  updateInterview,
};
