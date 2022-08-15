import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  GroupsCreateRequestDto,
  GroupsItemResponseDto,
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
  notification.success('Group has been succeffully created!');

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

export { createGroup, getPermissions };
