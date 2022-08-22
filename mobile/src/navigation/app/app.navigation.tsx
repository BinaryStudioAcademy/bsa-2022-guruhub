import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import {
  AppNavigationParamList,
  DrawerNavigationItem,
} from '~/common/types/types';
import { UAMConfigureGroup } from '~/components/uam/edit-group/components/components';
import { useAppSelector, useMemo } from '~/hooks/hooks';
import { getAllowedScreens } from '~/navigation/app/helpers/helpers';

import { NAVIGATION_ITEMS, SCREEN_OPTIONS } from './common/constants';
import { DrawerContent } from './components/components';

const Drawer = createDrawerNavigator<AppNavigationParamList>();

const App: FC = () => {
  const userPermissions = useAppSelector(
    (state) => state.auth.user?.permissions ?? [],
  );

  const allowedScreens = useMemo(() => {
    const screens: DrawerNavigationItem[] = NAVIGATION_ITEMS.flatMap(
      (item) => item.subroutes,
    );

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

      <Drawer.Screen
        name={AppScreenName.UAM_GROUPS_CREATE}
        component={UAMConfigureGroup}
      />
      <Drawer.Screen
        name={AppScreenName.UAM_GROUPS_EDIT}
        component={UAMConfigureGroup}
      />
    </Drawer.Navigator>
  );
};

export { App };
