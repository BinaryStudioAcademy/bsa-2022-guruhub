import { reducer as auth } from './auth/reducer';
import { reducer as dashboard } from './dashboard/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as uamConfigurateGroup } from './uam-configurate-group/reducer';

const rootReducer = {
  auth,
  uam,
  dashboard,
  uamConfigurateGroup,
};

export { rootReducer };
