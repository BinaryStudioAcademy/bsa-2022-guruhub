import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  CoursesManagementScreenName,
  PermissionKey,
} from '~/common/enums/enums';
import { CoursesNavigationItem } from '~/common/types/types';
import { EditCourse } from '~/components/course/components/components';
import { CoursesManagement } from '~/components/courses-management/courses-management';
import { Course } from '~/navigation/course/course-stack.navigation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const COURSES_MANAGEMENT_SCREENS: CoursesNavigationItem[] = [
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
    component: Course,
    permissions: [],
    isAuthRequired: false,
  },
];

export { COURSES_MANAGEMENT_SCREENS, SCREEN_OPTIONS };
