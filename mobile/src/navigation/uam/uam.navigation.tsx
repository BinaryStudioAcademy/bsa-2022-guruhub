import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { UAMScreenName } from '~/common/enums/enums';
import { UAMNavigationParamList } from '~/common/types/types';
import { useAppNavigate, useCallback, useFocusEffect } from '~/hooks/hooks';

import { NAVIGATION_ITEMS, SCREEN_OPTIONS } from './common/constants/constants';

const UAM: FC = () => {
  const NativeStack = createNativeStackNavigator<UAMNavigationParamList>();
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
      {NAVIGATION_ITEMS.map((screen) => {
        return (
          <NativeStack.Screen
            key={screen.name}
            name={screen.name as UAMScreenName}
            component={screen.component}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { UAM };
