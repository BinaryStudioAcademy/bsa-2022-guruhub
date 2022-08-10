import { AppScreenName } from '~/common/enums/enums';

type DrawerNavigationListSubroutes = {
  name: AppScreenName;
  iconName: string;
};

type DrawerNavigationList = {
  name: string;
  subroutes: DrawerNavigationListSubroutes[];
  focusedRouteName: string;
};

export { type DrawerNavigationList };
