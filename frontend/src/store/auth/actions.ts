import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserSignInResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi } = extra;

  return authApi.signUp(registerPayload);
});

const signIn = createAsyncThunk<
  UserSignInResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (loginPayload, { extra }) => {
  const { authApi } = extra;

  return authApi.signIn(loginPayload);
});

export { signUp, signIn };
