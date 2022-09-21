import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

import {
  AppColor,
  AppFontFamily,
  CourseScreenName,
  CourseTabsName,
  PermissionKey,
} from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import {
  CourseStudents,
  EditCourse,
  MyMentor,
} from '~/components/course/components/components';
import { Course } from '~/components/course/course';
import { CourseModule } from '~/navigation/course-module/course-module.navigation';

import { CourseTabs } from '../../course-tabs.navigation';

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
    name: CourseTabsName.ABOUT,
    component: Course,
    permissions: [],
    isAuthRequired: false,
  },
  {
    name: CourseTabsName.MY_MENTOR,
    component: MyMentor,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: CourseTabsName.MY_STUDENTS,
    component: CourseStudents,
    permissions: [],
    isAuthRequired: true,
  },
];

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: CourseScreenName.COURSE,
    component: CourseTabs,
    permissions: [],
    isAuthRequired: false,
  },
  {
    name: CourseScreenName.EDIT_COURSE,
    component: EditCourse,
    permissions: [PermissionKey.MANAGE_CATEGORIES],
    isAuthRequired: true,
  },
  {
    name: CourseScreenName.COURSE_MODULE,
    component: CourseModule,
    permissions: [],
    isAuthRequired: true,
  },
];

export { COURSE_TAB_ITEMS, NAVIGATION_ITEMS, SCREEN_OPTIONS };
