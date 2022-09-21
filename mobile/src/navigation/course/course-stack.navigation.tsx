import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { CourseScreenName } from '~/common/enums/enums';
import {
  CourseNavigationParamList,
  NavigationItem,
} from '~/common/types/types';
import { getPermittedScreens, getScreensByAuth } from '~/helpers/helpers';
import {
  useAppNavigate,
  useAppSelector,
  useEffect,
  useMemo,
} from '~/hooks/hooks';

import { NAVIGATION_ITEMS } from './common/constants/constants';

const Course: FC = () => {
  const NativeStack = createNativeStackNavigator<CourseNavigationParamList>();
  const navigation = useAppNavigate();

  const SCREEN_OPTIONS: NativeStackNavigationOptions = {
    headerTitleAlign: 'center',
  };

  const { user } = useAppSelector((state) => state.auth);

  const userPermissions = user?.permissions ?? [];

  const allowedScreens: NavigationItem[] = useMemo(() => {
    const screensByAuth = getScreensByAuth(NAVIGATION_ITEMS, Boolean(user));

    const permittedScreens = getPermittedScreens(
      screensByAuth,
      userPermissions,
    );

    return permittedScreens;
  }, [user]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <NativeStack.Navigator screenOptions={SCREEN_OPTIONS}>
      {allowedScreens.map((screen) => {
        return (
          <NativeStack.Screen
            key={screen.name}
            name={screen.name as CourseScreenName}
            component={screen.component}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { Course };
