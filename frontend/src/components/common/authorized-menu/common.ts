import { AppRoute } from 'common/enums/enums';

const routes = [
  {
    name: 'Menu',
    subroutes: [
      {
        name: 'Overview',
        iconName: 'home',
        href: AppRoute.ROOT,
      },
      {
        name: 'Courses',
        iconName: 'course',
        href: AppRoute.COURSES,
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
] as const;

export { routes };
