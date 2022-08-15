import React from 'react';

import { DrawerNavigationItem } from '~/common/types/navigation/drawer-navigation-item.type';

type DrawerNavigationItemWithPermissions = DrawerNavigationItem & {
  permissions: string[];
  component: React.FC;
};

type DrawerNavigationList = {
  name: string;
  subroutes: DrawerNavigationItemWithPermissions[];
};

export { type DrawerNavigationList };
