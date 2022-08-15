import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsItemResponseDto,
  UsersDeleteRequestParamsDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getGroups = createAsyncThunk<
  EntityPagination<GroupsItemResponseDto>,
  void,
  AsyncThunkConfig
>(ActionType.GET_GROUPS, async (_, { extra }) => {
  const { groupsApi } = extra;
  const groups = await groupsApi.getAll();

  return groups;
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

export { deleteUser, getGroups, getUsers };
