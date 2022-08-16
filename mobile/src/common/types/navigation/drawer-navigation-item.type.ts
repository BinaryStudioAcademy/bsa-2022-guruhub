import React from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { PermissionItem } from '~/common/types/types';
import { IconName } from '~/common/types/ui/ui';

type DrawerNavigationItem = {
  name: AppScreenName;
  isFocused?: boolean;
  icon: IconName;
  permissions: PermissionItem[];
  component: React.FC;
};

export { type DrawerNavigationItem };
