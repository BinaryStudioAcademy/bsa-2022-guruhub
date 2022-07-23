import { createAsyncThunk } from '@reduxjs/toolkit';

import { CreateUserPayload, AsyncThunkConfig, User } from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<User, CreateUserPayload, AsyncThunkConfig>(
	ActionType.SIGN_UP,
	async (registerPayload, { extra }) => {
		const { authApi } = extra;

		return authApi.signUp(registerPayload);
	}
);

export { signUp };
