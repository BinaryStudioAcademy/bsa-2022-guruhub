import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
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

const deleteUser = createAsyncThunk<
  void,
  UsersDeleteRequestParamsDto,
  AsyncThunkConfig
>(ActionType.DELETE_USER, async (payload, { extra }) => {
  const { usersApi } = extra;

  await usersApi.delete(payload);
});

export { deleteUser, getUsers };
