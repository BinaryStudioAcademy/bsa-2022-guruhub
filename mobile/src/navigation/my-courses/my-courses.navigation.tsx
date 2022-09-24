import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { MyCoursesScreenName } from '~/common/enums/enums';
import {
  MyCoursesNavigationParamList,
  NavigationItem,
} from '~/common/types/types';
import { getPermittedScreens, getScreensByAuth } from '~/helpers/helpers';
import { useAppSelector, useMemo } from '~/hooks/hooks';

import { NAVIGATION_ITEMS, SCREEN_OPTIONS } from './common/constants/constants';

const MyCourses: FC = () => {
  const NativeStack =
    createNativeStackNavigator<MyCoursesNavigationParamList>();
  const { user } = useAppSelector((state) => state.auth);

  const userPermissions = user?.permissions ?? [];

  const allowedScreens: NavigationItem[] = useMemo(() => {
    const screensByAuth = getScreensByAuth(NAVIGATION_ITEMS, Boolean(user));

    const permittedScreens = getPermittedScreens(
      screensByAuth,
      userPermissions,
    );

    return permittedScreens;
  }, [user, userPermissions]);

  return (
    <NativeStack.Navigator screenOptions={SCREEN_OPTIONS}>
      {allowedScreens.map((screen) => {
        return (
          <NativeStack.Screen
            key={screen.name}
            name={screen.name as MyCoursesScreenName}
            component={screen.component}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { MyCourses };
