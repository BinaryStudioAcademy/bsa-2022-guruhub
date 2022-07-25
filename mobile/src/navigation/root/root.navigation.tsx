import React, { FC } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { Auth } from '~/components/auth/auth';
import { RootScreenName } from '~/common/enums/enums';
import { RootNavigationParamList } from '~/common/types/types';

const NativeStack = createNativeStackNavigator<RootNavigationParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: FC = () => {
  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      <NativeStack.Screen name={RootScreenName.SIGN_UP} component={Auth} />
      <NativeStack.Screen name={RootScreenName.SIGN_IN} component={Auth} />
    </NativeStack.Navigator>
  );
};

export { Root };
