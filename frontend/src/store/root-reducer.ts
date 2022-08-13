import { reducer as auth } from './auth/reducer';
import { reducer as courses } from './courses/reducer';
import { reducer as uam } from './uam/reducer';

const rootReducer = {
  auth,
  courses,
  uam,
};

export { rootReducer };
