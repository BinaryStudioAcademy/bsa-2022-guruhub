import { reducer as auth } from './auth/reducer';
import { reducer as uam } from './uam/reducer';

const rootReducer = {
  auth,
  uam,
};

export { rootReducer };
