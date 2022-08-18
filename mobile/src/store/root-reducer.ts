import { reducer as auth } from './auth/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as uamGroupConfig } from './uam-group-config/reducer';

const rootReducer = {
  auth,
  uam,
  uamGroupConfig,
};

export { rootReducer };
