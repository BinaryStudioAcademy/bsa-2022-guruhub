import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  GroupsCreateRequestDto,
  GroupsGetByIdRequestDto,
  GroupsGetByIdResponseDto,
  GroupsItemResponseDto,
  GroupUpdateRequestArgumentsDto,
  PermissionsGetAllResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const createGroup = createAsyncThunk<
  GroupsItemResponseDto,
  GroupsCreateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_GROUP, async (registerPayload, { extra }) => {
  const { groupsApi, notification } = extra;
  const groupsResponseDto = await groupsApi.create(registerPayload);
  notification.success(NotificationMessage.GROUP_CREATE);

  return groupsResponseDto;
});

const getPermissions = createAsyncThunk<
  PermissionsGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_PERMISSIONS, async (_, { extra }) => {
  const { permissionsApi } = extra;
  const permissions = await permissionsApi.getAll();

  return permissions;
});

const getGroupById = createAsyncThunk<
  GroupsGetByIdResponseDto,
  GroupsGetByIdRequestDto,
  AsyncThunkConfig
>(ActionType.GET_GROUP, async (request, { extra }) => {
  const { groupsApi } = extra;
  const group = await groupsApi.getById(request.id);

  return group;
});

const updateGroup = createAsyncThunk<
  GroupsItemResponseDto,
  GroupUpdateRequestArgumentsDto,
  AsyncThunkConfig
>(ActionType.UPDATE_GROUP, async (updatePayload, { extra }) => {
  const { groupsApi, notification } = extra;
  const group = await groupsApi.update(updatePayload);
  notification.success(NotificationMessage.GROUP_UPDATE);

  return group;
});

export { createGroup, getGroupById, getPermissions, updateGroup };
