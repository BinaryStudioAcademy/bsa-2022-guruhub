import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { AuthScreenName } from '~/common/enums/enums';
import { AuthNavigationParamList } from '~/common/types/types';
import { Auth } from '~/components/auth/auth';

import { screenOptions } from './auth-tab-screen-options';

const Tab = createMaterialTopTabNavigator<AuthNavigationParamList>();

const AuthTab: FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={AuthScreenName.SIGN_UP} component={Auth} />
      <Tab.Screen name={AuthScreenName.SIGN_IN} component={Auth} />
    </Tab.Navigator>
  );
};

export { AuthTab };
