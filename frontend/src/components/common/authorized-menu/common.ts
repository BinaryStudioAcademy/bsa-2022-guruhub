import { AppRoute } from 'common/enums/enums';
import { NavigationMenuItem } from 'common/types/types';

const routes: NavigationMenuItem[] = [
  {
    name: 'Menu',
    subroutes: [
      {
        name: 'Courses',
        iconName: 'course',
        href: AppRoute.ROOT,
      },
      {
        name: 'Mentors',
        iconName: 'mentors',
        href: AppRoute.MENTORS,
      },
      {
        name: 'Education',
        iconName: 'education',
        href: AppRoute.EDUCATION,
      },
      {
        name: 'Interview',
        iconName: 'home',
        href: AppRoute.INTERVIEW,
      },
    ],
  },
  {
    name: 'Account',
    subroutes: [
      {
        name: 'Billing',
        iconName: 'billing',
        href: AppRoute.BILLING,
      },
      {
        name: 'Settings',
        iconName: 'settings',
        href: AppRoute.SETTINGS,
      },
    ],
  },
];

export { routes };
