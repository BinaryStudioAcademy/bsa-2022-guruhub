import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { CourseScreenName } from '~/common/enums/enums';
import { CourseNavigationParamList } from '~/common/types/types';
import { BackButton } from '~/components/common/common';
import {
  useAppNavigate,
  useAppSelector,
  useEffect,
  useMemo,
} from '~/hooks/hooks';

import { COURSE_TAB_ITEMS, SCREEN_OPTIONS } from './common/constants';
import { getAllowedScreens } from './helpers/helpers';

const Tab = createMaterialTopTabNavigator<CourseNavigationParamList>();

const Course: FC = () => {
  const navigation = useAppNavigate();

  const userPermissions = useAppSelector(
    (state) => state.auth.user?.permissions ?? [],
  );

  const allowedScreens = useMemo(() => {
    return getAllowedScreens(COURSE_TAB_ITEMS, userPermissions);
  }, [userPermissions]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={SCREEN_OPTIONS}
      initialRouteName={CourseScreenName.ABOUT}
    >
      {allowedScreens.map((screen) => {
        return (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export { Course };
