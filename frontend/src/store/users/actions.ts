import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UserResponse } from 'common/types/types';
import { ActionType } from './common';

const getUsers = createAsyncThunk<UserResponse[], void, AsyncThunkConfig>(
  ActionType.USERS,
  async (_, { extra }) => {
    const { usersApi } = extra;
    const users = await usersApi.getUsers();

    return users;
  },
);

export { getUsers };
