import { DrawerNavigationOptions } from '@react-navigation/drawer';

import { AppColor, AppScreenName } from '~/common/enums/enums';
import { DrawerNavigationList } from '~/common/types/types';
import { Billing } from '~/components/billing/billing';
import { Courses } from '~/components/courses/courses';
import { Mentors } from '~/components/mentors/mentors';
import { MyEducation } from '~/components/my-education/my-education';
import { Overview } from '~/components/overview/overview';
import { Settings } from '~/components/setting/setting';

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
        icon: 'home',
        component: Overview,
        permissions: ['uac'],
      },
      {
        name: AppScreenName.COURSES,
        icon: 'book',
        component: Courses,
        permissions: ['uac'],
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
    ],
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
