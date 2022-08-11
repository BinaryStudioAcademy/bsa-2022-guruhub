import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsGetAllResponseDto,
  UsersGetResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getUsers = createAsyncThunk<
  EntityPagination<UsersGetResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_USERS, async ({ page, count }, { extra }) => {
  const { usersApi } = extra;
  const usersDto = await usersApi.getAll({ page, count });

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
