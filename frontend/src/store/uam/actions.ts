import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  GroupsGetAllResponseDto,
  UsersDeleteRequestParamsDto,
  UsersGetAllResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getUsers = createAsyncThunk<
  UsersGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_USERS, async (_, { extra }) => {
  const { usersApi } = extra;
  const usersDto = await usersApi.getAll();

  return usersDto;
});

const getGroups = createAsyncThunk<
  GroupsGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_GROUPS, async (_, { extra }) => {
  const { groupsApi } = extra;
  const groups = await groupsApi.getAll();

  return groups;
});

const deleteUser = createAsyncThunk<
  string,
  UsersDeleteRequestParamsDto,
  AsyncThunkConfig
>(ActionType.DELETE_USER, async (payload, { extra }) => {
  const { usersApi } = extra;

  await usersApi.delete(payload);

  const { id } = payload;

  return id;
});

export { deleteUser, getGroups, getUsers };
