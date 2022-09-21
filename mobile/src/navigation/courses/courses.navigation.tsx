import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { CoursesScreenName } from '~/common/enums/enums';
import { CoursesNavigationParamList } from '~/common/types/types';
import { getPermittedScreens, getScreensByAuth } from '~/helpers/helpers';
import { useAppSelector, useMemo } from '~/hooks/hooks';
import { CoursesNavigationItem } from '~/navigation/courses/common/types/types';

import { NAVIGATION_ITEMS, SCREEN_OPTIONS } from './common/constants/constants';

const Courses: FC = () => {
  const NativeStack = createNativeStackNavigator<CoursesNavigationParamList>();

  const { user } = useAppSelector((state) => state.auth);

  const userPermissions = user?.permissions ?? [];

  const allowedScreens: CoursesNavigationItem[] = useMemo(() => {
    const screensByAuth = getScreensByAuth(NAVIGATION_ITEMS, Boolean(user));

    const permittedScreens = getPermittedScreens(
      screensByAuth,
      userPermissions,
    );

    return permittedScreens;
  }, [user]);

  return (
    <NativeStack.Navigator
      screenOptions={SCREEN_OPTIONS}
      initialRouteName={CoursesScreenName.COURSES}
    >
      {allowedScreens.map((screen) => {
        return (
          <NativeStack.Screen
            key={screen.name}
            name={screen.name as CoursesScreenName}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { Courses };
