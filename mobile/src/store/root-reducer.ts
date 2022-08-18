import { reducer as auth } from './auth/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as uamGroupConfig } from './uam-group-config/reducer';
import { reducer as uamGroupCreation } from './uam-groups-create/reducer';

const rootReducer = {
  auth,
  uam,
  uamGroupConfig,
  uamGroupCreation,
};

export { rootReducer };
