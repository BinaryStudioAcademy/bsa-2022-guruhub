import { DrawerNavigationOptions } from '@react-navigation/drawer';
import React from 'react';

import { PermissionKey } from '~/common/enums/enums';

type NavigationItem = {
  name: string;
  permissions: PermissionKey[];
  component: React.FC;
  isAuthRequired: boolean;
  screenOptions?: DrawerNavigationOptions;
};

export { type NavigationItem };
