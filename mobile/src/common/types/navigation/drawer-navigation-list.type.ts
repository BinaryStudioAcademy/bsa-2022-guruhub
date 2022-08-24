import { DrawerNavigationItem } from '~/common/types/navigation/navigation';

type DrawerNavigationList = {
  name: string;
  isVisible: boolean;
  subroutes: DrawerNavigationItem[];
};

export { type DrawerNavigationList };
