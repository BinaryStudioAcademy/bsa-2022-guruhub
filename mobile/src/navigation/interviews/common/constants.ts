import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { InterviewsScreenName, PermissionKey } from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import { Interviews } from '~/components/interviews/interviews';
import { Interview } from '~/navigation/interview/interview.navigation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: InterviewsScreenName.INTERVIEWS,
    component: Interviews,
    isAuthRequired: true,
    permissions: [
      PermissionKey.MANAGE_INTERVIEW,
      PermissionKey.MANAGE_INTERVIEWS,
    ],
  },
  {
    name: InterviewsScreenName.INTERVIEW,
    component: Interview,
    isAuthRequired: true,
    permissions: [],
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
