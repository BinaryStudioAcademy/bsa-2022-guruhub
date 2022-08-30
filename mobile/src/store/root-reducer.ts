import { reducer as auth } from './auth/reducer';
import { reducer as categories } from './categories/reducer';
import { reducer as courseModules } from './course-modules/reducer';
import { reducer as courses } from './courses/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as uamGroupEdit } from './uam-group-edit/reducer';
import { reducer as uamGroupCreation } from './uam-groups-create/reducer';

const rootReducer = {
  auth,
  uam,
  uamGroupEdit,
  uamGroupCreation,
  courses,
  categories,
  courseModules,
};

export { rootReducer };
