import { reducer as auth } from './auth/reducer';
import { reducer as dashboard } from './dashboard/reducer';
import { reducer as uam } from './uam/reducer';

const rootReducer = {
  auth,
  dashboard,
  uam,
};

export { rootReducer };
