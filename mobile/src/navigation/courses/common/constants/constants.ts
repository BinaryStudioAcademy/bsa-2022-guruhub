import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { CoursesScreenName } from '~/common/enums/enums';
import { CoursesNavigationItem } from '~/common/types/types';
import { AddCourse } from '~/components/courses/components/components';
import { Courses } from '~/components/courses/courses';
import { Course } from '~/navigation/course/course-stack.navigation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
};

const COURSES_SCREENS: CoursesNavigationItem[] = [
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
    component: Course,
    permissions: [],
    isAuthRequired: false,
  },
];

export { COURSES_SCREENS, SCREEN_OPTIONS };
