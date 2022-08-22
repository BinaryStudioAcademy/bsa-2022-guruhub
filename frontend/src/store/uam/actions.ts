import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsDeleteRequestParamDto,
  GroupsItemResponseDto,
  UsersDeleteRequestParamsDto,
  UsersGetResponseDto,
} from 'common/types/types';

import { authActions } from '../actions';
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
  EntityPagination<GroupsItemResponseDto>,
  EntityPaginationRequestQueryDto,
  AsyncThunkConfig
>(ActionType.GET_GROUPS, async ({ page, count }, { extra }) => {
  const { groupsApi } = extra;
  const groups = await groupsApi.getAll({ page, count });

  return groups;
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

const deleteGroup = createAsyncThunk<
  number,
  GroupsDeleteRequestParamDto,
  AsyncThunkConfig
>(ActionType.DELETE_GROUP, async (payload, { getState, extra, dispatch }) => {
  const { groupsApi } = extra;
  const { id } = payload;

  const {
    auth: { user: currentUser },
  } = getState();
  const groupData = await groupsApi.getById(id);

  await groupsApi.delete(payload);

  if (currentUser && groupData.userIds.includes(currentUser.id)) {
    dispatch(authActions.getCurrentUser());
  }

  return id;
});

export { deleteGroup, deleteUser, getGroups, getUsers };
