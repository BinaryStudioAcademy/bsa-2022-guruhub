import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsDeleteRequestParamDto,
  GroupsItemResponseDto,
  UsersDeleteRequestParamsDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getGroups = createAsyncThunk<
  EntityPagination<GroupsItemResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_GROUPS, async ({ page, count }, { extra }) => {
  const { groupsApi } = extra;
  const groups = await groupsApi.getPage({ page, count });

  return groups;
});

const deleteGroup = createAsyncThunk<
  number,
  GroupsDeleteRequestParamDto,
  AsyncThunkConfig
>(ActionType.DELETE_GROUP, async (payload, { extra }) => {
  const { groupsApi } = extra;

  await groupsApi.delete(payload);

  const { id } = payload;

  return id;
});

const getUsers = createAsyncThunk<
  EntityPagination<UsersGetResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_USERS, async ({ page, count }, { extra }) => {
  const { usersApi } = extra;
  const users = await usersApi.getPage({ page, count });

  return users;
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

export { deleteGroup, deleteUser, getGroups, getUsers };
