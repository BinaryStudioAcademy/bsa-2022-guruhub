import { reducer as auth } from './auth/reducer';
import { reducer as configurateGroup } from './configurate-group/reducer';
import { reducer as dashboard } from './dashboard/reducer';
import { reducer as uam } from './uam/reducer';

const rootReducer = {
  auth,
  uam,
  dashboard,
  configurateGroup,
};

export { rootReducer };
