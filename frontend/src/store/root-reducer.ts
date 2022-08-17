import { reducer as auth } from './auth/reducer';
import { reducer as dashboard } from './dashboard/reducer';
import { reducer as groupsCreate } from './groups-create/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as userDetails } from './user-details/reducer';

const rootReducer = {
  auth,
  uam,
  userDetails,
  dashboard,
  groupsCreate,
};

export { rootReducer };
