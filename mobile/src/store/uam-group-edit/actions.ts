import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  GroupGetByIdResponseDto,
  GroupsItemResponseDto,
  GroupsUpdateRequestParamsDto,
  GroupUpdateRequestParamsDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getGroupById = createAsyncThunk<
  GroupGetByIdResponseDto,
  GroupsUpdateRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_GROUP, async (id, { extra }) => {
  const { groupsApi } = extra;

  const group = await groupsApi.getById(id);

  return group;
});

const editGroup = createAsyncThunk<
  GroupsItemResponseDto,
  GroupUpdateRequestParamsDto,
  AsyncThunkConfig
>(ActionType.EDIT_GROUP, async (editPayload, { extra }) => {
  const { groupsApi } = extra;

  const group = await groupsApi.edit(editPayload);

  return group;
});

const cancelEdit = createAction(ActionType.CANCEL_EDIT);

export { cancelEdit, editGroup, getGroupById };
