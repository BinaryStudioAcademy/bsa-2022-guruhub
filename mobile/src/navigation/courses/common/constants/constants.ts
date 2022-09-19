import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { CoursesScreenName, PermissionKey } from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import { EditCourse } from '~/components/course/components/components';
import { Task } from '~/components/course-module/components/components';
import { AddCourse } from '~/components/courses/components/components';
import { Courses } from '~/components/courses/courses';
import { Course } from '~/navigation/course/course.navigation';
import { CourseModule } from '~/navigation/course-module/course-module.navigation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
};

const COURSES_SCREENS: NavigationItem[] = [
  {
    name: CoursesScreenName.COURSES,
    component: Courses,
    permissions: [],
    isAuthRequired: true,
    options: { headerShown: false },
  },
  {
    name: CoursesScreenName.ADD_COURSE,
    component: AddCourse,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: CoursesScreenName.COURSE,
    component: Course,
    permissions: [],
    isAuthRequired: false,
  },
  {
    name: CoursesScreenName.COURSE_MODULE,
    component: CourseModule,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: CoursesScreenName.TASK,
    component: Task,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: CoursesScreenName.EDIT_COURSE,
    component: EditCourse,
    permissions: [PermissionKey.MANAGE_CATEGORIES],
    isAuthRequired: true,
  },
];

export { COURSES_SCREENS, SCREEN_OPTIONS };
