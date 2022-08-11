import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootScreenName } from '~/common/enums/enums';
import { RootNavigationParamList, RootState } from '~/common/types/types';
import { App as AppNavigation } from '~/navigation/app/app.navigation';
import { Auth as AuthNavigation } from '~/navigation/auth/auth.navigation';

const NativeStack = createNativeStackNavigator<RootNavigationParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      {currentUser?.token ? (
        <NativeStack.Screen
          name={RootScreenName.APP}
          component={AppNavigation}
        />
      ) : (
        <NativeStack.Screen
          name={RootScreenName.AUTH}
          component={AuthNavigation}
        />
      )}
    </NativeStack.Navigator>
  );
};

export { Root };
