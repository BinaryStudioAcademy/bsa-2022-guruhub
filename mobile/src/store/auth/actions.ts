import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  UserSignInRequestDto,
  UserSignUpRequestDto,
  UserWithPermissions,
} from '~/common/types/types';

import { ActionType } from './common';

const signUp = createAsyncThunk<
  UserWithPermissions,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (payload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signUp(payload);
  storage.set(StorageKey.ACCESS_TOKEN, token);

  return user;
});

const signIn = createAsyncThunk<
  UserWithPermissions,
  UserSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (payload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signIn(payload);
  storage.set(StorageKey.ACCESS_TOKEN, token);

  return user;
});

const loadCurrentUser = createAsyncThunk<
  UserWithPermissions,
  void,
  AsyncThunkConfig
>(ActionType.LOAD_CURRENT_USER, async (_payload, { extra }) => {
  const { authApi } = extra;
  const user = await authApi.getCurrentUser();

  return user;
});

const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.LOGOUT,
  (_payload, { extra }) => {
    const { storage } = extra;

    storage.delete(StorageKey.ACCESS_TOKEN);
  },
);

export { loadCurrentUser, logout, signIn, signUp };
