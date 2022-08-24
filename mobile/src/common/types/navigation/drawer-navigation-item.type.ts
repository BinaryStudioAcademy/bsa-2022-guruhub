import React from 'react';

import { AppScreenName, PermissionKey } from '~/common/enums/enums';
import { IconName } from '~/common/types/ui/ui';

type DrawerNavigationItem = {
  name: AppScreenName;
  isFocused?: boolean;
  icon?: IconName;
  permissions: PermissionKey[];
  component: React.FC;
};

export { type DrawerNavigationItem };
