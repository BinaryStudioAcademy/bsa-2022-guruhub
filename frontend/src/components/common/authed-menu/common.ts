import { AppRoute } from 'common/enums/enums';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as CourseIcon } from 'assets/icons/course.svg';
import { ReactComponent as MentorsIcon } from 'assets/icons/mentors.svg';
import { ReactComponent as EducationIcon } from 'assets/icons/education.svg';
import { ReactComponent as BillingIcon } from 'assets/icons/billing.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';

const routes = [
  {
    name: 'Menu',
    subroutes: [
      {
        name: 'Overview',
        Icon: HomeIcon,
        href: AppRoute.ROOT,
      },
      {
        name: 'Courses',
        Icon: CourseIcon,
        href: AppRoute.COURSES,
      },
      {
        name: 'Mentors',
        Icon: MentorsIcon,
        href: AppRoute.MENTORS,
      },
      {
        name: 'Education',
        Icon: EducationIcon,
        href: AppRoute.EDUCATION,
      },
    ],
  },
  {
    name: 'Account',
    subroutes: [
      {
        name: 'Billing',
        Icon: BillingIcon,
        href: AppRoute.BILLING,
      },
      {
        name: 'Settings',
        Icon: SettingsIcon,
        href: AppRoute.SETTINGS,
      },
    ],
  },
];

export { routes };
