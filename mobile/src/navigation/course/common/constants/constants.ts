import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

import {
  AppColor,
  AppFontFamily,
  CourseScreenName,
} from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import {
  CourseStudents,
  MyMentor,
} from '~/components/course/components/components';
import { Course } from '~/components/course/course';

const COUNT_TABS_FOR_HIDE = 1;
const SCREEN_OPTIONS: MaterialTopTabNavigationOptions = {
  tabBarLabelStyle: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: 'none',
  },
  tabBarStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  tabBarIndicatorStyle: {
    backgroundColor: AppColor.BRAND.BLUE_100,
  },
  swipeEnabled: false,
  tabBarActiveTintColor: AppColor.TEXT.GRAY_100,
  tabBarInactiveTintColor: AppColor.TEXT.GRAY_200,
};

const COURSE_TAB_ITEMS: NavigationItem[] = [
  {
    name: CourseScreenName.ABOUT,
    component: Course,
    permissions: [],
    isAuthRequired: false,
  },
  {
    name: CourseScreenName.MY_MENTOR,
    component: MyMentor,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: CourseScreenName.MY_STUDENTS,
    component: CourseStudents,
    permissions: [],
    isAuthRequired: true,
  },
];

export { COUNT_TABS_FOR_HIDE, COURSE_TAB_ITEMS, SCREEN_OPTIONS };
