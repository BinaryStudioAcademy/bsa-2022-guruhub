import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  UserDetailsCreateRequestDto,
  UserDetailsItemDto,
  UserDetailsUpdateImage,
} from 'common/types/types';

import { ActionType } from './common';

const getUserDetails = createAsyncThunk<
  UserDetailsItemDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_USER_DETAILS, async (_, { extra }) => {
  const { userDetailsApi } = extra;
  const userDetails = await userDetailsApi.get();

  return userDetails;
});

const updateUserDetails = createAsyncThunk<
  UserDetailsItemDto,
  UserDetailsCreateRequestDto,
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
  UserDetailsUpdateImage,
  UserDetailsUpdateImage,
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
