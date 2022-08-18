import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  GroupsConfigureRequestDto,
  GroupsItemResponseDto,
  PermissionsGetAllResponseDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getPermissions = createAsyncThunk<
  PermissionsGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_PERMISSIONS, async (_, { extra }) => {
  const { permissionsApi } = extra;
  const permissions = await permissionsApi.getAll();

  return permissions;
});

const createGroup = createAsyncThunk<
  GroupsItemResponseDto,
  GroupsConfigureRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_GROUP, async (payload, { extra }) => {
  const { groupsApi } = extra;
  const response = await groupsApi.create(payload);

  return response;
});

export { createGroup, getPermissions };
