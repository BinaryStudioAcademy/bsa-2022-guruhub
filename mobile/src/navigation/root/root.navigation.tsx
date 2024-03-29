import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { FC, useEffect } from 'react';

import { DataStatus, RootScreenName, StorageKey } from '~/common/enums/enums';
import { RootNavigationParamList } from '~/common/types/types';
import { Spinner } from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { App as AppNavigation } from '~/navigation/app/app.navigation';
import { Auth as AuthNavigation } from '~/navigation/auth/auth.navigation';
import { storage } from '~/services/services';
import { authActions } from '~/store/actions';

const NativeStack = createNativeStackNavigator<RootNavigationParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: FC = () => {
  const { user, dataStatus } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const hasUser = Boolean(user);
  const hasToken = Boolean(storage.get(StorageKey.ACCESS_TOKEN));

  const initialScreen = hasUser ? RootScreenName.APP : RootScreenName.AUTH;

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [dispatch, hasToken]);

  if (!hasUser && hasToken && dataStatus !== DataStatus.REJECTED) {
    return <Spinner isOverflow />;
  }

  return (
    <NativeStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialScreen}
    >
      <NativeStack.Screen
        name={RootScreenName.AUTH}
        component={AuthNavigation}
      />
      <NativeStack.Screen name={RootScreenName.APP} component={AppNavigation} />
    </NativeStack.Navigator>
  );
};

export { Root };
