import { DrawerNavigationOptions } from '@react-navigation/drawer';

import {
  AppColor,
  AppFontFamily,
  AppScreenName,
  PermissionKey,
} from '~/common/enums/enums';
import { Billing } from '~/components/billing/billing';
import { Chat } from '~/components/chat/chat';
import { EmptyChats } from '~/components/chat/components/components';
import { ChatConversation } from '~/components/chat-conversation/chat-conversation';
import { EditCourse } from '~/components/course/components/components';
import { Task } from '~/components/course-module/components/components';
import { AddCourse } from '~/components/courses/components/components';
import { Courses } from '~/components/courses/courses';
import { CoursesManagement } from '~/components/courses-management/courses-management';
import { Interview } from '~/components/interview/interview';
import { Interviews } from '~/components/interviews/interviews';
import { Mentors } from '~/components/mentors/mentors';
import { MyEducation } from '~/components/my-education/my-education';
import { Settings } from '~/components/setting/setting';
import { UAM } from '~/components/uam/uam';
import { UAMConfigureGroup } from '~/components/uam-configure-group/uam-configure-group';
import { Course } from '~/navigation/course/course.navigation';
import { CourseModule } from '~/navigation/course-module/course-module.navigation';

import { DrawerNavigationItem } from '../types/types';

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

const NAVIGATION_ITEMS: DrawerNavigationItem[] = [
  {
    name: AppScreenName.COURSES,
    icon: 'book',
    component: Courses,
    permissions: [],
    isAuthRequired: false,
    drawerGroup: 'Menu',
  },
  {
    name: AppScreenName.MENTORS,
    icon: 'mentors',
    component: Mentors,
    permissions: [],
    isAuthRequired: true,
    drawerGroup: 'Menu',
  },
  {
    name: AppScreenName.MY_EDUCATION,
    icon: 'education',
    component: MyEducation,
    permissions: [],
    isAuthRequired: true,
    drawerGroup: 'Menu',
  },
  {
    name: AppScreenName.INTERVIEWS,
    icon: 'interview',
    component: Interviews,
    permissions: [
      PermissionKey.MANAGE_INTERVIEW,
      PermissionKey.MANAGE_INTERVIEWS,
    ],
    isAuthRequired: true,
    drawerGroup: 'Menu',
  },
  {
    name: AppScreenName.COURSE_MANAGEMENT,
    icon: 'book',
    component: CoursesManagement,
    permissions: [PermissionKey.MANAGE_CATEGORIES],
    isAuthRequired: true,
    drawerGroup: 'Menu',
  },
  {
    name: AppScreenName.CHAT,
    icon: 'message',
    component: Chat,
    permissions: [],
    isAuthRequired: true,
    drawerGroup: 'Account',
  },
  {
    name: AppScreenName.BILLING,
    icon: 'billing',
    component: Billing,
    permissions: [],
    isAuthRequired: true,
    drawerGroup: 'Account',
  },
  {
    name: AppScreenName.SETTINGS,
    icon: 'settings',
    component: Settings,
    permissions: [],
    isAuthRequired: true,
    drawerGroup: 'Account',
  },
  {
    name: AppScreenName.UAM,
    icon: 'uam',
    component: UAM,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
    drawerGroup: 'Account',
  },
  {
    name: AppScreenName.UAM_GROUPS_CREATE,
    icon: 'uam',
    component: UAMConfigureGroup,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
  },
  {
    name: AppScreenName.UAM_GROUPS_EDIT,
    icon: 'uam',
    component: UAMConfigureGroup,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
  },
  {
    name: AppScreenName.ADD_COURSE,
    component: AddCourse,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: AppScreenName.COURSE,
    component: Course,
    permissions: [],
    isAuthRequired: false,
  },
  {
    name: AppScreenName.COURSE_MODULE,
    component: CourseModule,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: AppScreenName.TASK,
    component: Task,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: AppScreenName.INTERVIEW,
    component: Interview,
    permissions: [
      PermissionKey.MANAGE_INTERVIEW,
      PermissionKey.MANAGE_INTERVIEWS,
    ],
    isAuthRequired: true,
  },
  {
    name: AppScreenName.CONVERSATION,
    component: ChatConversation,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: AppScreenName.ALL_CHATS,
    component: EmptyChats,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: AppScreenName.EDIT_COURSE,
    component: EditCourse,
    permissions: [PermissionKey.MANAGE_CATEGORIES],
    isAuthRequired: true,
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
