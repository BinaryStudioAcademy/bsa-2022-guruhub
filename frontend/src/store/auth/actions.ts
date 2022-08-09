import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from 'common/enums/enums';

import {
  UserSignUpRequestDto,
  UserSignInRequestDto,
  UserByIdResponse,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<
  UserByIdResponse,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signUp(registerPayload);

  storage.setItem(StorageKey.TOKEN, token);

  return user;
});

const signIn = createAsyncThunk<
  UserByIdResponse,
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

export { signUp, signIn, logout };
