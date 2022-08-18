import { RootScreenName } from '~/common/enums/enums';

import { AppNavigationParamList } from './app-navigation-param-list.type';
import { AuthNavigationParamList } from './auth-navigation-param-list.type';
import { NavigationScreenParams } from './navigation-screen-params.type';

type RootNavigationParamList = {
  [RootScreenName.AUTH]: NavigationScreenParams<AuthNavigationParamList>;
  [RootScreenName.APP]: NavigationScreenParams<AppNavigationParamList>;
};

export { type RootNavigationParamList };
