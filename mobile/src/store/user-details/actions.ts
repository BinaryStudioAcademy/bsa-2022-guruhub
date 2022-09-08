import { createAsyncThunk } from '@reduxjs/toolkit';

import { NotificationMessage, NotificationType } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  UserDetailsResponseDto,
  UserDetailsUpdateAvatarRequestDto,
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

const updateUserAvatar = createAsyncThunk<
  UserDetailsResponseDto,
  UserDetailsUpdateAvatarRequestDto,
  AsyncThunkConfig
>(ActionType.UPDATE_USER_AVATAR, async ({ file, userId }, { extra }) => {
  const { userDetailsApi, notification } = extra;

  const updatedUserDetails = await userDetailsApi.updateUserAvatar({
    file,
    userId,
  });

  notification.success(NotificationMessage.PROFILE_AVATAR_UPDATE);

  return updatedUserDetails;
});

export { getUserDetails, updateUserAvatar, updateUserDetails };
