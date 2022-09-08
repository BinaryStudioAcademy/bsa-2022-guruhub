import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { AppNavigationParamList } from '~/common/types/types';
import { getPermittedScreens, getScreensByAuth } from '~/helpers/helpers';
import { useAppSelector, useMemo } from '~/hooks/hooks';

import { NAVIGATION_ITEMS, SCREEN_OPTIONS } from './common/constants/constants';
import { DrawerContent } from './components/components';

const Drawer = createDrawerNavigator<AppNavigationParamList>();

const App: FC = () => {
  const { user, userPermissions } = useAppSelector(({ auth }) => ({
    userPermissions: auth.user?.permissions ?? [],
    user: auth.user,
  }));

  const allowedScreens = useMemo(() => {
    const screens = NAVIGATION_ITEMS.flatMap((item) => item.subroutes);
    const screensByAuth = getScreensByAuth(screens, Boolean(user));
    const permittedScreens = getPermittedScreens(
      screensByAuth,
      userPermissions,
    );

    return permittedScreens;
  }, [userPermissions, user]);

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
            name={screen.name as AppScreenName}
            component={screen.component}
          />
        );
      })}
    </Drawer.Navigator>
  );
};

export { App };
