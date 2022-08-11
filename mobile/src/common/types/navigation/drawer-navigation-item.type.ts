import { AppScreenName } from '~/common/enums/enums';

type DrawerNavigationItem = {
  name: AppScreenName;
  iconName: string;
  isFocused?: boolean;
};

export { type DrawerNavigationItem };
