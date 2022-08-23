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
      },
      {
        name: 'Mentors',
        iconName: 'mentors',
        href: AppRoute.MENTORS,
        permissions: [PermissionKey.MANAGE_MENTORING],
      },
      {
        name: 'Interview',
        iconName: 'education',
        href: AppRoute.INTERVIEW,
        permissions: [PermissionKey.MANAGE_INTERVIEWS],
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
