import { CourseTabsName } from '~/common/enums/navigation/course-tabs-name.enum';

type CourseTabNavigationParamList = {
  [CourseTabsName.ABOUT]: undefined;
  [CourseTabsName.MY_MENTOR]: undefined;
  [CourseTabsName.MY_STUDENTS]: undefined;
};

export { type CourseTabNavigationParamList };
