import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationType } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { ActionType } from './common';

const notify = createAsyncThunk<
  void,
  { type: NotificationType; message: string },
  AsyncThunkConfig
>(ActionType.NOTIFY, (payload, { extra }) => {
  const { notificationApi } = extra;
  const { type, message } = payload;
  return notificationApi[`${type}`](message);
});

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (payload, { extra }) => {
  const { authApi } = extra;
  return authApi.signUp(payload);
});

export { signUp, notify };
