import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
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

export { signUp };
