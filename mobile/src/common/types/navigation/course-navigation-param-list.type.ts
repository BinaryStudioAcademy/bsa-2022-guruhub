import { CourseScreenName } from '~/common/enums/navigation/course-screen-name.enum';

type CourseNavigationParamList = {
  [CourseScreenName.ABOUT]: undefined;
  [CourseScreenName.MY_MENTOR]: undefined;
  [CourseScreenName.MY_STUDENTS]: undefined;
};

export { type CourseNavigationParamList };
