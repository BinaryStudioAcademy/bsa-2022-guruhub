import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { RootScreenName } from '~/common/enums/enums';
import { RootNavigationParamList } from '~/common/types/types';
import { useAppSelector } from '~/hooks/hooks';
import { App as AppNavigation } from '~/navigation/app/app.navigation';
import { Auth as AuthNavigation } from '~/navigation/auth/auth.navigation';

const NativeStack = createNativeStackNavigator<RootNavigationParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: FC = () => {
  const hasUser = useAppSelector(({ auth }) => Boolean(auth.user));

  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      {hasUser ? (
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
