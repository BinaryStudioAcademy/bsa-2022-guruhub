import { DrawerNavigationOptions } from '@react-navigation/drawer';

import { AppColor, AppScreenName } from '~/common/enums/enums';

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

const NAVIGATION_ITEMS = [
  {
    name: 'Menu',
    border: true,
    subroutes: [
      {
        name: AppScreenName.OVERVIEW,
        iconName: '',
      },
      {
        name: AppScreenName.COURSES,
        iconName: '',
      },
      {
        name: AppScreenName.MENTORS,
        iconName: '',
      },
      {
        name: AppScreenName.MY_EDUCATION,
        iconName: '',
      },
    ],
  },
  {
    name: 'Account',
    subroutes: [
      {
        name: AppScreenName.BILLING,
        iconName: '',
      },
      {
        name: AppScreenName.SETTINGS,
        iconName: '',
      },
    ],
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
