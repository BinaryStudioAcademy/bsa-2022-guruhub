import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  UserDetailsResponseDto,
  UserDetailsUpdateImageRequestDto,
  UserDetailsUpdateInfoRequestDto,
} from 'common/types/types';

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
  async (updateUserDetailsPayload, { extra }) => {
    const { userDetailsApi } = extra;
    const userDetails = await userDetailsApi.updateUserDetails(
      updateUserDetailsPayload,
    );

    return userDetails;
  },
);

const updateUserDetailsAvatar = createAsyncThunk<
  UserDetailsResponseDto,
  UserDetailsUpdateImageRequestDto,
  AsyncThunkConfig
>(
  ActionType.UPDATE_USER_DETAILS_AVATAR,
  async (updateUserDetailsAvatarPayload, { extra }) => {
    const { userDetailsApi } = extra;
    const userDetails = await userDetailsApi.updateAvatar(
      updateUserDetailsAvatarPayload,
    );

    return userDetails;
  },
);
export { getUserDetails, updateUserDetails, updateUserDetailsAvatar };
