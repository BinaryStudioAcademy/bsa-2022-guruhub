import { reducer as auth } from './auth/reducer';
import { reducer as chats } from './chats/reducer';
import { reducer as course } from './course/reducer';
import { reducer as courseModule } from './course-module/reducer';
import { reducer as coursesManagement } from './courses-management/reducer';
import { reducer as dashboard } from './dashboard/reducer';
import { reducer as interview } from './interview/reducer';
import { reducer as interviews } from './interviews/reducer';
import { reducer as studentCourseModule } from './student-course-module/reducer';
import { reducer as uam } from './uam/reducer';
import { reducer as uamConfigureGroup } from './uam-configure-group/reducer';
import { reducer as userDetails } from './user-details/reducer';

const rootReducer = {
  auth,
  chats,
  uam,
  userDetails,
  dashboard,
  interview,
  uamConfigureGroup,
  course,
  courseModule,
  interviews,
  studentCourseModule,
  coursesManagement,
};

export { rootReducer };
