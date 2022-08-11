import { DrawerNavigationItem } from './drawer-navigation-item.type';

type DrawerNavigationList = {
  name: string;
  subroutes: DrawerNavigationItem[];
  focusedRouteName: string;
};

export { type DrawerNavigationList };
