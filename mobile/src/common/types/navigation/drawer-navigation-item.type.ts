import { AppScreenName } from '~/common/enums/enums';

type DrawerNavigationItem = {
  name: AppScreenName;
  icon: string;
  focusedRouteName: string;
};

export { type DrawerNavigationItem };
