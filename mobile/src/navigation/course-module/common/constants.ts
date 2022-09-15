import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

import {
  AppColor,
  AppFontFamily,
  CourseModuleScreenName,
} from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import { About, Task } from '~/components/course-module/components/components';

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

const MODULE_TAB_ITEMS: NavigationItem[] = [
  {
    name: CourseModuleScreenName.ABOUT,
    component: About,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: CourseModuleScreenName.TASK,
    component: Task,
    permissions: [],
    isAuthRequired: true,
  },
];

export { MODULE_TAB_ITEMS, SCREEN_OPTIONS };
