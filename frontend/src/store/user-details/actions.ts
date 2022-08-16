import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UserDetailsItemDto } from 'common/types/types';
import { UserDetailsCreateRequestDto } from 'guruhub-shared';

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
    const userDetails = await userDetailsApi.update(updateUserDetailsPayload);

    return userDetails;
  },
);

export { getUserDetails, updateUserDetails };
