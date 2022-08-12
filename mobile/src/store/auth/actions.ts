import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  UsersByIdResponseDto,
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from '~/common/types/types';

import { ActionType } from './common';

const signUp = createAsyncThunk<
  UsersByIdResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (payload, { extra }) => {
  const { authApi } = extra;
  const { user } = await authApi.signUp(payload);

  return user;
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
