import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  GroupsGetAllResponseDto,
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

export { getGroups, getUsers };
