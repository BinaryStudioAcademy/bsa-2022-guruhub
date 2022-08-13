import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, UserDetailsItemDto } from 'common/types/types';

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

export { getUserDetails };
