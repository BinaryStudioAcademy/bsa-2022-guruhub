import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { RootScreenName } from '~/common/enums/enums';
import { RootNavigationParamList } from '~/common/types/types';
import { App as AppNavigation } from '~/navigation/app/app.navigation';
import { Auth as AuthNavigation } from '~/navigation/auth/auth.navigation';

const NativeStack = createNativeStackNavigator<RootNavigationParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: FC = () => {
  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      <NativeStack.Screen
        name={RootScreenName.AUTH}
        component={AuthNavigation}
      />
      <NativeStack.Screen name={RootScreenName.APP} component={AppNavigation} />
    </NativeStack.Navigator>
  );
};

export { Root };
