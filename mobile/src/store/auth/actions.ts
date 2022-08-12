import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  UsersByIdResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';

import { ActionType } from './common';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (payload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signUp(payload);
  storage.set(StorageKey.ACCESS_TOKEN, token);

  return user;
});

const signIn = createAsyncThunk<
  UserSignInResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (payload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signIn(payload);
  storage.set(StorageKey.ACCESS_TOKEN, token);

  return user;
});

const loadCurrentUser = createAsyncThunk<
  UsersByIdResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.LOAD_CURRENT_USER, async (payload, { extra }) => {
  const { authApi } = extra;
  const user = await authApi.getCurrentUser();

  return user;
});

const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.LOGOUT,
  (payload, { extra }) => {
    const { storage } = extra;

    storage.delete(StorageKey.ACCESS_TOKEN);
  },
);

export { loadCurrentUser, logout, signIn, signUp };
