import { DrawerNavigationOptions } from '@react-navigation/drawer';

import {
  AppColor,
  AppFontFamily,
  AppScreenName,
  PermissionKey,
} from '~/common/enums/enums';
import { DrawerNavigationList } from '~/common/types/types';
import { Billing } from '~/components/billing/billing';
import { Courses } from '~/components/courses/courses';
import { Mentors } from '~/components/mentors/mentors';
import { MyEducation } from '~/components/my-education/my-education';
import { Overview } from '~/components/overview/overview';
import { Settings } from '~/components/setting/setting';
import { UAM } from '~/components/uam/uam';

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
};

const NAVIGATION_ITEMS: DrawerNavigationList[] = [
  {
    name: 'Menu',
    subroutes: [
      {
        name: AppScreenName.OVERVIEW,
        icon: 'home',
        component: Overview,
        permissions: [],
      },
      {
        name: AppScreenName.COURSES,
        icon: 'book',
        component: Courses,
        permissions: [],
      },
      {
        name: AppScreenName.MENTORS,
        icon: 'mentors',
        component: Mentors,
        permissions: [],
      },
      {
        name: AppScreenName.MY_EDUCATION,
        icon: 'education',
        component: MyEducation,
        permissions: [],
      },
    ],
  },
  {
    name: 'Account',
    subroutes: [
      {
        name: AppScreenName.BILLING,
        icon: 'billing',
        component: Billing,
        permissions: [],
      },
      {
        name: AppScreenName.SETTINGS,
        icon: 'settings',
        component: Settings,
        permissions: [],
      },
      {
        name: AppScreenName.UAM,
        icon: 'uam',
        component: UAM,
        permissions: [PermissionKey.MANAGE_UAM],
      },
    ],
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
