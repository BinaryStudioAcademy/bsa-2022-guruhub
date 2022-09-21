import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  AppColor,
  AppFontFamily,
  InterviewScreenName,
  InterviewsScreenName,
  PermissionKey,
} from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import {
  Applications,
  Notes,
} from '~/components/interview/components/components';
import { Interviews } from '~/components/interviews/interviews';

import { InterviewTabs } from '../interview-tab.navigation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const TAB_OPTIONS: MaterialTopTabNavigationOptions = {
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

const INTERVIEW_TAB_ITEMS: NavigationItem[] = [
  {
    name: InterviewScreenName.APPLICATIONS,
    component: Applications,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: InterviewScreenName.NOTES,
    component: Notes,
    permissions: [],
    isAuthRequired: true,
  },
];

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: InterviewsScreenName.INTERVIEWS,
    component: Interviews,
    isAuthRequired: true,
    permissions: [
      PermissionKey.MANAGE_INTERVIEW,
      PermissionKey.MANAGE_INTERVIEWS,
    ],
  },
  {
    name: InterviewsScreenName.INTERVIEW,
    component: InterviewTabs,
    isAuthRequired: true,
    permissions: [],
  },
];

export { INTERVIEW_TAB_ITEMS, NAVIGATION_ITEMS, SCREEN_OPTIONS, TAB_OPTIONS };
