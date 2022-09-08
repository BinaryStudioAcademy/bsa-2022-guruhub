import { IconName, NavigationItem } from '~/common/types/types';

type DrawerNavigationItem = NavigationItem & {
  isFocused?: boolean;
  icon?: IconName;
};

export { type DrawerNavigationItem };
