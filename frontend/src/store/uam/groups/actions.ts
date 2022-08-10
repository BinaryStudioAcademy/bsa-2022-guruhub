import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, GroupsGetAllResponseDto } from 'common/types/types';

import { ActionType } from './common';

const getGroups = createAsyncThunk<
  GroupsGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_GROUPS, async (_, { extra }) => {
  const { groupsApi } = extra;
  const groups = await groupsApi.getAll();

  return groups;
});

export { getGroups };
