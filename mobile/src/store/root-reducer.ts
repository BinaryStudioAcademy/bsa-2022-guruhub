import { reducer as auth } from './auth/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as uamGroupCreation } from './uam-groups-create/reducer';

const rootReducer = {
  auth,
  uam,
  uamGroupCreation,
};

export { rootReducer };
