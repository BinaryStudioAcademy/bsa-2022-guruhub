import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsCreateRequestDto,
  GroupsItemResponseDto,
  PermissionsGetAllResponseDto,
  UsersDeleteRequestParamsDto,
  UsersGetResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getUsers = createAsyncThunk<
  EntityPagination<UsersGetResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_USERS, async ({ page, count }, { extra }) => {
  const { usersApi } = extra;
  const usersDto = await usersApi.getPaginated({ page, count });

  return usersDto;
});

const getGroups = createAsyncThunk<
  EntityPagination<GroupsItemResponseDto>,
  void,
  AsyncThunkConfig
>(ActionType.GET_GROUPS, async (_, { extra }) => {
  const { groupsApi } = extra;
  const groups = await groupsApi.getAll();

  return groups;
});

const createGroup = createAsyncThunk<
  GroupsItemResponseDto,
  GroupsCreateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_GROUP, async (registerPayload, { extra }) => {
  const { groupsApi } = extra;
  const groupsResponseDto = await groupsApi.create(registerPayload);

  return groupsResponseDto;
});

const deleteUser = createAsyncThunk<
  number,
  UsersDeleteRequestParamsDto,
  AsyncThunkConfig
>(ActionType.DELETE_USER, async (payload, { extra }) => {
  const { usersApi } = extra;

  await usersApi.delete(payload);

  const { id } = payload;

  return id;
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

export { createGroup, deleteUser, getGroups, getPermissions, getUsers };
