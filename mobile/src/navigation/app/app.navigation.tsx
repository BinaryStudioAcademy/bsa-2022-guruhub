import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import {
  AppNavigationParamList,
  DrawerNavigationItem,
} from '~/common/types/types';
import { useAppSelector, useMemo } from '~/hooks/hooks';
import { getAllowedScreens } from '~/navigation/app/helpers/helpers';

import {
  NAVIGATION_ITEMS,
  NO_AUTH_NAVIGATION_ITEMS,
  SCREEN_OPTIONS,
} from './common/constants';
import { DrawerContent } from './components/components';

const Drawer = createDrawerNavigator<AppNavigationParamList>();

const App: FC = () => {
  const { user, userPermissions } = useAppSelector(({ auth }) => ({
    userPermissions: auth.user?.permissions ?? [],
    user: auth.user,
  }));

  const allowedScreens = useMemo(() => {
    const screens: DrawerNavigationItem[] = user
      ? NAVIGATION_ITEMS.flatMap((item) => item.subroutes)
      : NO_AUTH_NAVIGATION_ITEMS.flatMap((item) => item.subroutes);

    return getAllowedScreens(screens, userPermissions);
  }, [userPermissions]);

  return (
    <Drawer.Navigator
      initialRouteName={AppScreenName.COURSES}
      screenOptions={SCREEN_OPTIONS}
      drawerContent={(props): JSX.Element => <DrawerContent {...props} />}
    >
      {allowedScreens.map((screen) => {
        return (
          <Drawer.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        );
      })}
    </Drawer.Navigator>
  );
};

export { App };
