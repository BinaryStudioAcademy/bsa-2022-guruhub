import { CoursesManagementScreenName } from '~/common/enums/enums';

type CoursesManagementNavigationParamList = {
  [CoursesManagementScreenName.COURSE_MANAGEMENT]: undefined;
  [CoursesManagementScreenName.COURSE]: undefined;
  [CoursesManagementScreenName.EDIT_COURSE]: undefined;
};

export { type CoursesManagementNavigationParamList };
