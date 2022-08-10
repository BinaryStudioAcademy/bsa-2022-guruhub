import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, GroupsResponseDto } from 'common/types/types';

import { ActionType } from './common';

const getGroups = createAsyncThunk<GroupsResponseDto[], void, AsyncThunkConfig>(
  ActionType.GET_GROUPS,
  async (_, { extra }) => {
    const { groupsApi } = extra;
    const groups = await groupsApi.getAll();

    return groups;
  },
);

export { getGroups };
