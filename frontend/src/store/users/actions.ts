import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, User } from 'common/types/types';
import { ActionType } from './common';

const getUsers = createAsyncThunk<User[], void, AsyncThunkConfig>(
	ActionType.GET_USERS,
	async (_, { extra }) => {
		const { usersApi } = extra;

		return usersApi.getAll();
	}
);

export { getUsers };
