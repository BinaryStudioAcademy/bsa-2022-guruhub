import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  CoursesManagementScreenName,
  PermissionKey,
} from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import { EditCourse } from '~/components/course/components/components';
import { CoursesManagement } from '~/components/courses-management/courses-management';
import { ConfigureCourse } from '~/navigation/configure-course/configure-course.navigation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: CoursesManagementScreenName.COURSE_MANAGEMENT,
    component: CoursesManagement,
    permissions: [PermissionKey.MANAGE_CATEGORIES],
    isAuthRequired: true,
  },
  {
    name: CoursesManagementScreenName.EDIT_COURSE,
    component: EditCourse,
    permissions: [PermissionKey.MANAGE_CATEGORIES],
    isAuthRequired: true,
  },
  {
    name: CoursesManagementScreenName.COURSE,
    component: ConfigureCourse,
    permissions: [],
    isAuthRequired: false,
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
