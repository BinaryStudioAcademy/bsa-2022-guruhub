import { IconName, NavigationItem } from '~/common/types/types';

import { DrawerGroup } from './drawer-group.type';

type DrawerNavigationItem = NavigationItem & {
  icon?: IconName;
  drawerGroup?: DrawerGroup;
};

export { type DrawerNavigationItem };
