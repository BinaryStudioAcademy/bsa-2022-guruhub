import { reducer as auth } from './auth/reducer';
import { reducer as course } from './course/reducer';
import { reducer as dashboard } from './dashboard/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as uamConfigureGroup } from './uam-configure-group/reducer';

const rootReducer = {
  auth,
  uam,
  dashboard,
  uamConfigureGroup,
  course,
};

export { rootReducer };
