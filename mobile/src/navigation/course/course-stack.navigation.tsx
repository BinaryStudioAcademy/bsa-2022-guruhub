import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { CourseScreenName } from '~/common/enums/enums';
import {
  CourseNavigationParamList,
  CoursesNavigationItem,
} from '~/common/types/types';
import { getPermittedScreens, getScreensByAuth } from '~/helpers/helpers';
import {
  useAppNavigate,
  useAppSelector,
  useEffect,
  useMemo,
} from '~/hooks/hooks';

import { COURSE_SCREEN_ITEMS } from './common/constants/constants';

const Course: FC = () => {
  const NativeStack = createNativeStackNavigator<CourseNavigationParamList>();
  const navigation = useAppNavigate();

  const SCREEN_OPTIONS: NativeStackNavigationOptions = {
    headerTitleAlign: 'center',
  };

  const { user } = useAppSelector((state) => state.auth);

  const userPermissions = user?.permissions ?? [];

  const allowedScreens: CoursesNavigationItem[] = useMemo(() => {
    const screensByAuth = getScreensByAuth(COURSE_SCREEN_ITEMS, Boolean(user));

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
            options={screen.options}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { Course };
