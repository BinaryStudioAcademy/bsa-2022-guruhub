import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { CoursesManagementScreenName } from '~/common/enums/enums';
import { CoursesManagementNavigationParamList } from '~/common/types/types';
import { useAppNavigate, useCallback, useFocusEffect } from '~/hooks/hooks';

import {
  COURSES_MANAGEMENT_SCREENS,
  SCREEN_OPTIONS,
} from './common/constants/constants';

const CoursesManagement: FC = () => {
  const NativeStack =
    createNativeStackNavigator<CoursesManagementNavigationParamList>();
  const navigation = useAppNavigate();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: true,
      });
    }, []),
  );

  return (
    <NativeStack.Navigator screenOptions={SCREEN_OPTIONS}>
      {COURSES_MANAGEMENT_SCREENS.map((screen) => {
        return (
          <NativeStack.Screen
            key={screen.name}
            name={screen.name as CoursesManagementScreenName}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { CoursesManagement };
