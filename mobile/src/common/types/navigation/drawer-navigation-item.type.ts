import React from 'react';

import { AppScreenName } from '~/common/enums/enums';

import { PermissionItem } from '../types';
import { IconName } from '../ui/icon-name.type';

type DrawerNavigationItem = {
  name: AppScreenName;
  isFocused?: boolean;
  icon: IconName;
  permissions: PermissionItem[];
  component: React.FC;
};

export { type DrawerNavigationItem };
