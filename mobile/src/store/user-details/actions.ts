import { createAsyncThunk } from '@reduxjs/toolkit';

import { NotificationMessage, NotificationType } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
} from '~/common/types/types';
import { app } from '~/store/actions';

import { ActionType } from './common';

const getUserDetails = createAsyncThunk<
  UserDetailsResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_USER_DETAILS, async (_, { extra }) => {
  const { userDetailsApi } = extra;
  const userDetails = await userDetailsApi.get();

  return userDetails;
});

const updateUserDetails = createAsyncThunk<
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
  AsyncThunkConfig
>(
  ActionType.UPDATE_USER_DETAILS,
  async (updateUserDetailsPayload, { dispatch, extra }) => {
    const { userDetailsApi } = extra;
    const userDetails = await userDetailsApi.updateUserDetails(
      updateUserDetailsPayload,
    );
    dispatch(
      app.notify({
        type: NotificationType.SUCCESS,
        message: NotificationMessage.UPDATE_SUCCESS,
      }),
    );

    return userDetails;
  },
);

export { getUserDetails, updateUserDetails };
