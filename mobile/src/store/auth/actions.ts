import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  UsersByIdResponseDto,
  UserSignInRequestDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';

import { ActionType } from './common';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (payload, { extra }) => {
  const { authApi } = extra;

  return authApi.signUp(payload);
});

const signIn = createAsyncThunk<
  UsersByIdResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (payload, { extra }) => {
  const { authApi } = extra;
  const { user } = await authApi.signIn(payload);

  return user;
});

export { signIn, signUp };
