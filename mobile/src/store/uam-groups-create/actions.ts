import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsCreateRequestDto,
  GroupsItemResponseDto,
  PermissionsGetAllResponseDto,
  UsersGetResponseDto,
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

const getUsersForCreation = createAsyncThunk<
  EntityPagination<UsersGetResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_USERS, async ({ page, count }, { extra }) => {
  const { usersApi } = extra;
  const users = await usersApi.getPage({ page, count });

  return users;
});

const createGroup = createAsyncThunk<
  GroupsItemResponseDto,
  GroupsCreateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_GROUP, async (payload, { extra }) => {
  const { groupsApi } = extra;
  const response = await groupsApi.create(payload);

  return response;
});

export { createGroup, getPermissions, getUsersForCreation };
