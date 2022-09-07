import { CourseModuleScreenName, CourseScreenName } from '~/common/enums/enums';

type CourseNavigationParamList = {
  [CourseScreenName.ABOUT]: undefined;
  [CourseScreenName.MY_MENTOR]: undefined;
  [CourseScreenName.MY_STUDENTS]: undefined;
  [CourseModuleScreenName.TASK]: undefined;
};

export { type CourseNavigationParamList };
