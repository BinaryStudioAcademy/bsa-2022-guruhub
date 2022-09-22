import { reducer as auth } from './auth/reducer';
import { reducer as billing } from './billing/reducer';
import { reducer as categories } from './categories/reducer';
import { reducer as chat } from './chat/reducer';
import { reducer as courseModules } from './course-modules/reducer';
import { reducer as courses } from './courses/reducer';
import { reducer as coursesManagement } from './courses-management/reducer';
import { reducer as interview } from './interview/reducer';
import { reducer as interviews } from './interviews/reducer';
import { reducer as myCourses } from './my-courses/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as uamGroupEdit } from './uam-group-edit/reducer';
import { reducer as uamGroupCreation } from './uam-groups-create/reducer';
import { reducer as userDetails } from './user-details/reducer';

const rootReducer = {
  auth,
  billing,
  uam,
  uamGroupEdit,
  uamGroupCreation,
  courses,
  coursesManagement,
  categories,
  courseModules,
  myCourses,
  userDetails,
  interview,
  interviews,
  chat,
};

export { rootReducer };
