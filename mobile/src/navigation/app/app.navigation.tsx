import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { AppNavigationParamList } from '~/common/types/types';
import { getPermittedScreens, getScreensByAuth } from '~/helpers/helpers';
import { useAppSelector, useMemo } from '~/hooks/hooks';

import { NAVIGATION_ITEMS, SCREEN_OPTIONS } from './common/constants/constants';
import { DrawerNavigationItem } from './common/types/types';
import { DrawerContent } from './components/components';

const Drawer = createDrawerNavigator<AppNavigationParamList>();

const App: FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const userPermissions = user?.permissions ?? [];

  const allowedScreens: DrawerNavigationItem[] = useMemo(() => {
    const screensByAuth = getScreensByAuth(NAVIGATION_ITEMS, Boolean(user));

    const permittedScreens = getPermittedScreens(
      screensByAuth,
      userPermissions,
    );

    return permittedScreens;
  }, [user]);

  const drawerItems = allowedScreens.filter((item: DrawerNavigationItem) =>
    Boolean(item.drawerGroup),
  );

  return (
    <Drawer.Navigator
      initialRouteName={AppScreenName.COURSES}
      screenOptions={SCREEN_OPTIONS}
      drawerContent={(props): JSX.Element => (
        <DrawerContent {...props} items={drawerItems} />
      )}
    >
      {allowedScreens.map((screen) => {
        return (
          <Drawer.Screen
            key={screen.name}
            name={screen.name as AppScreenName}
            component={screen.component}
            options={screen.screenOptions}
          />
        );
      })}
    </Drawer.Navigator>
  );
};

export { App };
