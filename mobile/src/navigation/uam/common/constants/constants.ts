import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { PermissionKey, UAMScreenName } from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import { UAMConfigureGroup } from '~/components/uam/edit-group/components/components';
import { UAM } from '~/components/uam/uam';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: UAMScreenName.UAM,
    component: UAM,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
  },
  {
    name: UAMScreenName.UAM_GROUPS_CREATE,
    component: UAMConfigureGroup,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
  },
  {
    name: UAMScreenName.UAM_GROUPS_EDIT,
    component: UAMConfigureGroup,
    permissions: [PermissionKey.MANAGE_UAM],
    isAuthRequired: true,
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
