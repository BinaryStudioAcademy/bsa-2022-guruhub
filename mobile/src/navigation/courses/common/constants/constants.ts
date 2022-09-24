import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { CoursesScreenName } from '~/common/enums/enums';
import { AddCourse } from '~/components/courses/components/components';
import { Courses } from '~/components/courses/courses';
import { ConfigureCourse } from '~/navigation/configure-course/configure-course.navigation';
import { CoursesNavigationItem } from '~/navigation/courses/common/types/types';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
};

const NAVIGATION_ITEMS: CoursesNavigationItem[] = [
  {
    name: CoursesScreenName.COURSES,
    component: Courses,
    permissions: [],
    isAuthRequired: false,
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
    component: ConfigureCourse,
    permissions: [],
    isAuthRequired: false,
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
