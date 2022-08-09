import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UsersGetAllResponseDto } from 'common/types/types';
import { PermissionsGetAllResponseDto } from 'guruhub-shared';

import { ActionType } from './common';

const getUsers = createAsyncThunk<
  UsersGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_USERS, async (_, { extra }) => {
  const { usersApi } = extra;
  const users = await usersApi.getAll();

  return users;
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

export { getPermissions, getUsers };
