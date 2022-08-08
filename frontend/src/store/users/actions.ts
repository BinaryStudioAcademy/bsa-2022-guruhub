import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UserByIdResponse } from 'common/types/types';
import { ActionType } from './common';

const getUsers = createAsyncThunk<UserByIdResponse[], void, AsyncThunkConfig>(
  ActionType.USERS,
  async (_, { extra }) => {
    const { usersApi } = extra;
    const users = await usersApi.getUsers();

    return users;
  },
);

export { getUsers };
