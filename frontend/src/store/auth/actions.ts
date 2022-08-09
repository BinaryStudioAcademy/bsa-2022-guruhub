import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  UsersByIdResponseDto,
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from 'common/types/types';

import { ActionType } from './common';

const signUp = createAsyncThunk<
  UsersByIdResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signUp(registerPayload);

  storage.setItem(StorageKey.TOKEN, token);

  return user;
});

const signIn = createAsyncThunk<
  UsersByIdResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (loginPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signIn(loginPayload);

  storage.setItem(StorageKey.TOKEN, token);

  return user;
});

const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.LOGOUT,
  (_request, { extra }) => {
    const { storage } = extra;

    storage.removeItem(StorageKey.TOKEN);
  },
);

const getCurrentUser = createAsyncThunk<
  UsersByIdResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.FETCH_CURRENT_USER, async (_payload, { extra }) => {
  const { authApi } = extra;
  const user = await authApi.getCurrentUser();

  return user;
});

export { getCurrentUser,logout, signIn, signUp };
