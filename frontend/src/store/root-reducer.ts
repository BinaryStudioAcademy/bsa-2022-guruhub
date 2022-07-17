import { reducer as auth } from './auth/reducer';
import { reducer as users } from './users/reducer';

const rootReducer = {
	auth,
	users
};

export { rootReducer };
