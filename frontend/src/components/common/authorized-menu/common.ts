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
        name: 'Course settings',
        iconName: 'course',
        href: AppRoute.COURSE_CATEGORIES,
        permissions: [PermissionKey.MANAGE_CATEGORIES],
      },
    ],
  },
  {
    name: 'Account',
    subroutes: [
      {
        name: 'Billing',
        iconName: 'billing',
        href: AppRoute.SETTINGS_BILLING,
        permissions: [],
      },
      {
        name: 'Profile Settings',
        iconName: 'settings',
        href: AppRoute.SETTINGS_PROFILE,
        permissions: [],
      },
      {
        name: 'UAM',
        iconName: 'uam',
        href: AppRoute.UAM,
        permissions: [PermissionKey.MANAGE_UAM],
      },
    ],
  },
];

export { routes };
