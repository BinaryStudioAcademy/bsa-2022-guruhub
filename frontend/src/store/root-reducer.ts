import { reducer as auth } from './auth/reducer';
import { reducer as course } from './course/reducer';
import { reducer as courseModule } from './course-module/reducer';
import { reducer as dashboard } from './dashboard/reducer';
import { reducer as interviews } from './interview/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as uamConfigureGroup } from './uam-configure-group/reducer';
import { reducer as userDetails } from './user-details/reducer';

const rootReducer = {
  auth,
  uam,
  userDetails,
  dashboard,
  uamConfigureGroup,
  course,
  courseModule,
  interviews,
};

export { rootReducer };
