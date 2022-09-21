import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { PermissionKey, UamScreenName } from '~/common/enums/enums';
import { CoursesNavigationItem } from '~/common/types/types';
import { UAMConfigureGroup } from '~/components/uam/edit-group/components/components';
import { UAM } from '~/components/uam/uam';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const UAM_SCREENS: CoursesNavigationItem[] = [
  {
    name: UamScreenName.UAM,
    component: UAM,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
  },
  {
    name: UamScreenName.UAM_GROUPS_CREATE,
    component: UAMConfigureGroup,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
  },
  {
    name: UamScreenName.UAM_GROUPS_EDIT,
    component: UAMConfigureGroup,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
  },
];

export { SCREEN_OPTIONS, UAM_SCREENS };
