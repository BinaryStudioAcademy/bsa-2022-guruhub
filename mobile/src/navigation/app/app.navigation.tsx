import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { AppNavigationParamList } from '~/common/types/types';

import { NAVIGATION_ITEMS, SCREEN_OPTIONS } from './common/constants';
import { DrawerContent } from './components/components';

const Drawer = createDrawerNavigator<AppNavigationParamList>();

const App: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={AppScreenName.OVERVIEW}
      screenOptions={SCREEN_OPTIONS}
      drawerContent={(props): JSX.Element => <DrawerContent {...props} />}
    >
      {NAVIGATION_ITEMS.map((item) => {
        return item.subroutes.map((subItem) => {
          if (subItem.permissions.includes('uac')) {
            return (
              <Drawer.Screen
                name={subItem.name}
                component={subItem.component}
              />
            );
          }
        });
      })}
    </Drawer.Navigator>
  );
};

export { App };
