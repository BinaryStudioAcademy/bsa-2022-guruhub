import { DrawerNavigationOptions } from '@react-navigation/drawer';

import { AppColor, AppFontFamily, AppScreenName } from '~/common/enums/enums';
import { DrawerNavigationList } from '~/common/types/types';

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
      },
      {
        name: AppScreenName.COURSES,
        icon: 'book',
      },
      {
        name: AppScreenName.MENTORS,
        icon: 'mentors',
      },
      {
        name: AppScreenName.MY_EDUCATION,
        icon: 'education',
      },
    ],
  },
  {
    name: 'Account',
    subroutes: [
      {
        name: AppScreenName.BILLING,
        icon: 'billing',
      },
      {
        name: AppScreenName.SETTINGS,
        icon: 'settings',
      },
      {
        name: AppScreenName.UAM,
      },
    ],
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
