import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { ConfigureCourseScreenName } from '~/common/enums/enums';
import { ConfigureCourseParamList, NavigationItem } from '~/common/types/types';
import { getPermittedScreens, getScreensByAuth } from '~/helpers/helpers';
import {
  useAppNavigate,
  useAppSelector,
  useEffect,
  useMemo,
} from '~/hooks/hooks';

import { NAVIGATION_ITEMS, SCREEN_OPTIONS } from './common/constants/constants';

const ConfigureCourse: FC = () => {
  const NativeStack = createNativeStackNavigator<ConfigureCourseParamList>();
  const navigation = useAppNavigate();

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
            name={screen.name as ConfigureCourseScreenName}
            component={screen.component}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { ConfigureCourse };
