import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { MyCoursesScreenName } from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import { ConfigureCourse } from '~/navigation/configure-course/configure-course.navigation';
import { MyCourses } from '~/navigation/my-courses-results/my-courses-results.navigation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: MyCoursesScreenName.MY_COURSES,
    component: MyCourses,
    permissions: [],
    isAuthRequired: false,
  },
  {
    name: MyCoursesScreenName.COURSE,
    component: ConfigureCourse,
    permissions: [],
    isAuthRequired: false,
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
