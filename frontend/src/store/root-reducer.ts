import { reducer as auth } from './auth/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as userDetails } from './user-details/reducer';

const rootReducer = {
  auth,
  uam,
  userDetails,
};

export { rootReducer };
