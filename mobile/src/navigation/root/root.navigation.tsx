import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react';

import { RootScreenName } from '~/common/enums/enums';
import { RootNavigationParamList } from '~/common/types/types';
import { Auth } from '~/components/auth/auth';
import { Spinner } from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { App as AppNavigation } from '~/navigation/app/app.navigation';
import { loadCurrentUser } from '~/store/auth/actions';

const NativeStack = createNativeStackNavigator<RootNavigationParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Root: FC = () => {
  const { user } = useAppSelector((state) => ({ user: state.auth.user }));
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadCurrentUser()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, setIsLoading]);

  if (!user && isLoading) {
    return <Spinner />;
  }

  return (
    <NativeStack.Navigator screenOptions={screenOptions}>
      {user ? (
        <NativeStack.Screen
          name={RootScreenName.APP}
          component={AppNavigation}
        />
      ) : (
        <>
          <NativeStack.Screen name={RootScreenName.SIGN_IN} component={Auth} />
          <NativeStack.Screen name={RootScreenName.SIGN_UP} component={Auth} />
        </>
      )}
    </NativeStack.Navigator>
  );
};

export { Root };
