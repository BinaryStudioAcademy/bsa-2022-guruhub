import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import {
  AppNavigationParamList,
  DrawerNavigationItem,
  PermissionItem,
} from '~/common/types/types';
import { useAppSelector, useMemo } from '~/hooks/hooks';

import { NAVIGATION_ITEMS, SCREEN_OPTIONS } from './common/constants';
import { DrawerContent } from './components/components';

const Drawer = createDrawerNavigator<AppNavigationParamList>();

const App: FC = () => {
  const permissions = useAppSelector((state) => state.auth.user?.permissions);

  const getAllowedScreens = (
    screens: DrawerNavigationItem[],
    userPermissions: PermissionItem[] | undefined,
  ): DrawerNavigationItem[] => {
    return screens.filter((screen) => {
      if (!screen.permissions.length) {
        return true;
      }

      return screen.permissions.some((permission) => {
        return (
          userPermissions?.filter(
            (userPermission) => userPermission.id === permission.id,
          ).length ?? false
        );
      });
    });
  };

  const allowedScreens = useMemo(() => {
    const screens: DrawerNavigationItem[] = NAVIGATION_ITEMS.flatMap(
      (item) => item.subroutes,
    );

    return getAllowedScreens(screens, permissions);
  }, [permissions]);

  return (
    <Drawer.Navigator
      initialRouteName={AppScreenName.OVERVIEW}
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
