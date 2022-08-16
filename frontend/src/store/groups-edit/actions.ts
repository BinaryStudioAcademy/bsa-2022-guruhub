import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  GroupsGetByIdRequestDto,
  GroupsGetByIdResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getGroupById = createAsyncThunk<
  GroupsGetByIdResponseDto,
  GroupsGetByIdRequestDto,
  AsyncThunkConfig
>(ActionType.GET_GROUP, async (request, { extra }) => {
  const { groupsApi } = extra;
  const group = await groupsApi.getById(request.id);

  return group;
});

export { getGroupById };
