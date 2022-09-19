import { CoursesScreenName } from '~/common/enums/enums';

type CoursesNavigationParamList = {
  [CoursesScreenName.COURSES]: undefined;
  [CoursesScreenName.ADD_COURSE]: undefined;
  [CoursesScreenName.COURSE]: undefined;
  [CoursesScreenName.COURSE_MODULE]: undefined;
  [CoursesScreenName.EDIT_COURSE]: undefined;
  [CoursesScreenName.TASK]: undefined;
};

export { type CoursesNavigationParamList };
