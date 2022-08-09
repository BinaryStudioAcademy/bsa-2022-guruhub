import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { RootScreenName } from '~/common/enums/enums';
import { RootNavigationParamList } from '~/common/types/types';
import { Auth } from '~/components/auth/auth';

import { App as AppNavigation } from '../app/app.navigation';

const NativeStack = createNativeStackNavigator<RootNavigationParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: FC = () => {
  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      <NativeStack.Screen name={RootScreenName.SIGN_UP} component={Auth} />
      <NativeStack.Screen name={RootScreenName.SIGN_IN} component={Auth} />
      <NativeStack.Screen name={RootScreenName.APP} component={AppNavigation} />
    </NativeStack.Navigator>
  );
};

export { Root };
