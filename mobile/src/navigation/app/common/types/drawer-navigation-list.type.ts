import { DrawerNavigationItem } from './drawer-navigation-item.type';

type DrawerNavigationList = {
  name: string;
  isVisible: boolean;
  subroutes: DrawerNavigationItem[];
};

export { type DrawerNavigationList };
