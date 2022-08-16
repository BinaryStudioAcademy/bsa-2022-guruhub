import { reducer as auth } from './auth/reducer';
import { reducer as dashboard } from './dashboard/reducer';
import { reducer as groupsCreate } from './groups-create/reducer';
import { reducer as groupsEdit } from './groups-edit/reducer';
import { reducer as uam } from './uam/reducer';

const rootReducer = {
  auth,
  uam,
  dashboard,
  groupsCreate,
  groupsEdit,
};

export { rootReducer };
