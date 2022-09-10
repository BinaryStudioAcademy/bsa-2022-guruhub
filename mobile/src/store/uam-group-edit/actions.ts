import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { NotificationMessage, NotificationType } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  GroupGetByIdResponseDto,
  GroupsItemResponseDto,
  GroupsUpdateRequestParamsDto,
  GroupUpdateRequestParamsDto,
} from '~/common/types/types';
import { app } from '~/store/actions';

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
>(ActionType.EDIT_GROUP, async (editPayload, { dispatch, extra }) => {
  const { groupsApi } = extra;

  const group = await groupsApi.edit(editPayload);
  dispatch(
    app.notify({
      type: NotificationType.SUCCESS,
      message: NotificationMessage.GROUP_EDIT_SUCCESS,
    }),
  );

  return group;
});

const cancelEdit = createAction(ActionType.CANCEL_EDIT);

export { cancelEdit, editGroup, getGroupById };
