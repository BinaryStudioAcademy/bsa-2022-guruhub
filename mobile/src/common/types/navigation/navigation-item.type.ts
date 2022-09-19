import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

import { PermissionKey } from '~/common/enums/enums';

type NavigationItem = {
  name: string;
  permissions: PermissionKey[];
  component: React.FC;
  isAuthRequired: boolean;
  options?: NativeStackNavigationOptions;
};

export { type NavigationItem };
