import { AppRoute, PermissionKey } from 'common/enums/enums';
import { NavigationMenuItem } from 'common/types/types';

const routes: NavigationMenuItem[] = [
  {
    name: 'Menu',
    subroutes: [
      {
        name: 'My Courses',
        iconName: 'course',
        href: AppRoute.MY_COURSES,
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
        name: 'Courses Management',
        iconName: 'course',
        href: AppRoute.COURSES_MANAGEMENT,
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
        href: AppRoute.BILLING,
        permissions: [],
      },
      {
        name: 'Profile Settings',
        iconName: 'settings',
        href: AppRoute.PROFILE,
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
