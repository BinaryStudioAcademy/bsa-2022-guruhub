import { DrawerNavigationOptions } from '@react-navigation/drawer';

import {
  AppColor,
  AppFontFamily,
  AppScreenName,
  PermissionKey,
} from '~/common/enums/enums';
import { DrawerNavigationList } from '~/common/types/types';
import { Billing } from '~/components/billing/billing';
import { EditCourseCategory } from '~/components/course/components/components';
import { AddCourse } from '~/components/courses/components/components';
import { Courses } from '~/components/courses/courses';
import { Interview } from '~/components/interview/interview';
import { Interviews } from '~/components/interviews/interviews';
import { Mentors } from '~/components/mentors/mentors';
import { MyEducation } from '~/components/my-education/my-education';
import { Settings } from '~/components/setting/setting';
import { UAM } from '~/components/uam/uam';
import { UAMConfigureGroup } from '~/components/uam-configure-group/uam-configure-group';
import { Course } from '~/navigation/course/course.navigation';
import { CourseModule } from '~/navigation/course-module/course-module.navigation';

const SCREEN_OPTIONS: DrawerNavigationOptions = {
  swipeEdgeWidth: 70,
  headerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  headerTintColor: AppColor.TEXT.GRAY_100,
  headerTitleStyle: {
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 20,
    letterSpacing: 0.5,
  },
  drawerStyle: {
    width: '90%',
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  headerTitleAlign: 'center',
};

const NAVIGATION_ITEMS: DrawerNavigationList[] = [
  {
    name: 'Menu',
    isVisible: true,
    subroutes: [
      {
        name: AppScreenName.COURSES,
        icon: 'book',
        component: Courses,
        permissions: [],
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
      {
        name: AppScreenName.INTERVIEWS,
        icon: 'interview',
        component: Interviews,
        permissions: [
          PermissionKey.MANAGE_INTERVIEW,
          PermissionKey.MANAGE_INTERVIEWS,
        ],
      },
    ],
  },
  {
    name: 'Account',
    isVisible: true,
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
      {
        name: AppScreenName.UAM,
        icon: 'uam',
        component: UAM,
        permissions: [PermissionKey.MANAGE_UAM],
      },
    ],
  },
  {
    name: 'UAM Configure Group',
    isVisible: false,
    subroutes: [
      {
        name: AppScreenName.UAM_GROUPS_CREATE,
        icon: 'uam',
        component: UAMConfigureGroup,
        permissions: [PermissionKey.MANAGE_UAM],
      },
      {
        name: AppScreenName.UAM_GROUPS_EDIT,
        icon: 'uam',
        component: UAMConfigureGroup,
        permissions: [PermissionKey.MANAGE_UAM],
      },
    ],
  },
  {
    name: 'Courses',
    isVisible: false,
    subroutes: [
      {
        name: AppScreenName.ADD_COURSE,
        component: AddCourse,
        permissions: [],
      },
      {
        name: AppScreenName.COURSE,
        component: Course,
        permissions: [],
      },
      {
        name: AppScreenName.EDIT_COURSE_CATEGORY,
        component: EditCourseCategory,
        permissions: [PermissionKey.MANAGE_CATEGORIES],
      },
      {
        name: AppScreenName.COURSE_MODULE,
        component: CourseModule,
        permissions: [],
      },
    ],
  },
  {
    name: 'Interviews',
    isVisible: false,
    subroutes: [
      {
        name: AppScreenName.INTERVIEW,
        component: Interview,
        permissions: [
          PermissionKey.MANAGE_INTERVIEW,
          PermissionKey.MANAGE_INTERVIEWS,
        ],
      },
    ],
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
