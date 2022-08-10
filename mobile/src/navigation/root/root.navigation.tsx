import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { RootScreenName } from '~/common/enums/enums';
import { RootNavigationParamList } from '~/common/types/types';
import { Auth } from '~/components/auth/auth';
import { Courses } from '~/components/courses/courses'; // refactor

const NativeStack = createNativeStackNavigator<RootNavigationParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: FC = () => {
  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      <NativeStack.Screen name={RootScreenName.COURSES} component={Courses} />
      <NativeStack.Screen name={RootScreenName.SIGN_UP} component={Auth} />
      <NativeStack.Screen name={RootScreenName.SIGN_IN} component={Auth} />
    </NativeStack.Navigator>
  );
};

export { Root };
