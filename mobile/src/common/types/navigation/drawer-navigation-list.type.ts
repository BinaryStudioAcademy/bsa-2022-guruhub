import { DrawerNavigationItem } from '~/common/types/navigation/drawer-navigation-item.type';

type DrawerNavigationList = {
  name: string;
  subroutes: DrawerNavigationItem[];
};

export { type DrawerNavigationList };
