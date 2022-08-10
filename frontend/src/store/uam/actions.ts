import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UsersGetAllResponseDto } from 'common/types/types';

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

export { getUsers };
