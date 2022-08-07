import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from 'common/enums/enums';

import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signUp(registerPayload);

  storage.setItem(StorageKey.TOKEN, token);

  return user;
});

export { signUp };
