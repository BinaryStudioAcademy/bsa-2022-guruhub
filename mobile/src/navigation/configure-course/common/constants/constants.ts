import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { ConfigureCourseScreenName, PermissionKey } from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import { EditCourse } from '~/components/course/components/components';
import { Course } from '~/navigation/course/course.navigation';
import { CourseModule } from '~/navigation/course-module/course-module.navigation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: ConfigureCourseScreenName.COURSE,
    component: Course,
    permissions: [],
    isAuthRequired: false,
  },
  {
    name: ConfigureCourseScreenName.EDIT_COURSE,
    component: EditCourse,
    permissions: [PermissionKey.MANAGE_CATEGORIES],
    isAuthRequired: true,
  },
  {
    name: ConfigureCourseScreenName.COURSE_MODULE,
    component: CourseModule,
    permissions: [],
    isAuthRequired: true,
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
