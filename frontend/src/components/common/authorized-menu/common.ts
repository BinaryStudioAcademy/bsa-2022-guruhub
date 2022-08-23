import { AppRoute, PermissionKey } from 'common/enums/enums';
import { NavigationMenuItem } from 'common/types/types';

const routes: NavigationMenuItem[] = [
  {
    name: 'Menu',
    subroutes: [
      {
        name: 'Courses',
        iconName: 'course',
        href: AppRoute.ROOT,
        permissions: [],
      },
      {
        name: 'Mentors',
        iconName: 'mentors',
        href: AppRoute.MENTORS,
        permissions: [PermissionKey.MANAGE_MENTORING],
      },
      {
        name: 'Interviews',
        iconName: 'interview',
        href: AppRoute.INTERVIEW,
        permissions: [
          PermissionKey.MANAGE_INTERVIEWS,
          PermissionKey.MANAGE_INTERVIEW,
        ],
      },
      {
        name: 'UAM',
        iconName: 'education',
        href: AppRoute.UAM,
        permissions: [PermissionKey.MANAGE_UAM],
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
        permissions: [],
      },
      {
        name: 'Settings',
        iconName: 'settings',
        href: AppRoute.SETTINGS,
        permissions: [],
      },
    ],
  },
];

export { routes };
