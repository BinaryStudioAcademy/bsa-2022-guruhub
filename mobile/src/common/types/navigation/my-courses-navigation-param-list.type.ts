import { MyCoursesScreenName } from '~/common/enums/enums';

type MyCoursesNavigationParamList = {
  [MyCoursesScreenName.MENTOR]: undefined;
  [MyCoursesScreenName.STUDENT]: undefined;
  [MyCoursesScreenName.COURSE]: undefined;
  [MyCoursesScreenName.COURSE_MODULE]: undefined;
  [MyCoursesScreenName.EDIT_COURSE]: undefined;
  [MyCoursesScreenName.TASK]: undefined;
};

export { type MyCoursesNavigationParamList };
