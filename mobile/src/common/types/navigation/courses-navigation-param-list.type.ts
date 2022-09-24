import { CoursesScreenName } from '~/common/enums/enums';

type CoursesNavigationParamList = {
  [CoursesScreenName.COURSES]: undefined;
  [CoursesScreenName.ADD_COURSE]: undefined;
  [CoursesScreenName.COURSE]: undefined;
};

export { type CoursesNavigationParamList };
