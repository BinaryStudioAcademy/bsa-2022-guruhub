import { DrawerNavigationOptions } from '@react-navigation/drawer';

import { AppColor, AppScreenName } from '~/common/enums/enums';
import { DrawerNavigationList } from '~/common/types/types';

const SCREEN_OPTIONS: DrawerNavigationOptions = {
  swipeEdgeWidth: 100,
  headerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  headerTintColor: AppColor.TEXT.GRAY_100,
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '500',
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
      },
      {
        name: AppScreenName.COURSES,
      },
      {
        name: AppScreenName.MENTORS,
      },
      {
        name: AppScreenName.MY_EDUCATION,
      },
    ],
  },
  {
    name: 'Account',
    subroutes: [
      {
        name: AppScreenName.BILLING,
      },
      {
        name: AppScreenName.SETTINGS,
      },
    ],
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
