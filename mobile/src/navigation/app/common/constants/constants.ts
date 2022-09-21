import { DrawerNavigationOptions } from '@react-navigation/drawer';

import {
  AppColor,
  AppFontFamily,
  AppScreenName,
  PermissionKey,
} from '~/common/enums/enums';
import { Billing } from '~/components/billing/billing';
import { Settings } from '~/components/setting/setting';
import { Chat } from '~/navigation/chat/chat.navigation';
import { Courses } from '~/navigation/courses/courses.navigation';
import { CoursesManagement } from '~/navigation/courses-management/courses-management.navigation';
import { Interviews } from '~/navigation/interview/interview-stack.navigation';
import { MyCourses } from '~/navigation/my-courses/my-courses-stack.navigation';
import { UAM } from '~/navigation/uam/uam.navigation';

import { DrawerNavigationItem } from '../types/types';

const SCREEN_OPTIONS: DrawerNavigationOptions = {
  swipeEdgeWidth: 70,
  headerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  headerTintColor: AppColor.TEXT.GRAY_100,
  headerTitleStyle: {
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 20,
    letterSpacing: 0.5,
  },
  drawerStyle: {
    width: '90%',
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  headerTitleAlign: 'center',
};

const NAVIGATION_ITEMS: DrawerNavigationItem[] = [
  {
    name: AppScreenName.COURSES,
    icon: 'book',
    component: Courses,
    permissions: [],
    isAuthRequired: false,
    drawerGroup: 'Menu',
  },
  {
    name: AppScreenName.MY_COURSES,
    icon: 'education',
    component: MyCourses,
    permissions: [],
    isAuthRequired: true,
    drawerGroup: 'Menu',
    screenOptions: {
      swipeEdgeWidth: 10,
    },
  },
  {
    name: AppScreenName.INTERVIEWS,
    icon: 'interview',
    component: Interviews,
    permissions: [
      PermissionKey.MANAGE_INTERVIEW,
      PermissionKey.MANAGE_INTERVIEWS,
    ],
    isAuthRequired: true,
    drawerGroup: 'Menu',
    screenOptions: {
      swipeEdgeWidth: 10,
    },
  },
  {
    name: AppScreenName.COURSE_MANAGEMENT,
    icon: 'book',
    component: CoursesManagement,
    permissions: [PermissionKey.MANAGE_CATEGORIES],
    isAuthRequired: true,
    drawerGroup: 'Menu',
    screenOptions: {
      swipeEdgeWidth: 10,
    },
  },
  {
    name: AppScreenName.CHAT,
    icon: 'message',
    component: Chat,
    permissions: [],
    isAuthRequired: true,
    drawerGroup: 'Account',
  },
  {
    name: AppScreenName.BILLING,
    icon: 'billing',
    component: Billing,
    permissions: [],
    isAuthRequired: true,
    drawerGroup: 'Account',
  },
  {
    name: AppScreenName.SETTINGS,
    icon: 'settings',
    component: Settings,
    permissions: [],
    isAuthRequired: true,
    drawerGroup: 'Account',
  },
  {
    name: AppScreenName.UAM,
    icon: 'uam',
    component: UAM,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
    drawerGroup: 'Account',
    screenOptions: {
      swipeEdgeWidth: 10,
    },
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
