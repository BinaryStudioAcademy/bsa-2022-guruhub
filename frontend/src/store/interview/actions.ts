import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  InterviewNoteCreateDto,
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteGetAllResponseDto,
  InterviewNoteGetRequestArgumentsDto,
} from 'common/types/types';

import { ActionType } from './common';

const getNotes = createAsyncThunk<
  InterviewNoteGetAllResponseDto,
  InterviewNoteGetRequestArgumentsDto,
  AsyncThunkConfig
>(ActionType.GET_NOTES, async (payload, { extra }) => {
  const { interviewNoteApi } = extra;
  const { interviewId } = payload;

  const notesPayload = await interviewNoteApi.getAll({ interviewId });

  return notesPayload;
});

const createNote = createAsyncThunk<
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteCreateDto,
  AsyncThunkConfig
>(ActionType.CREATE_NOTE, async (payload, { extra }) => {
  const { interviewNoteApi } = extra;
  const { interviewId, note } = payload;

  const newNote = await interviewNoteApi.create({ interviewId, note });

  return newNote;
});

export { createNote, getNotes };
