import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { UamScreenName } from '~/common/enums/enums';
import { UamNavigationParamList } from '~/common/types/types';
import { useAppNavigate, useCallback, useFocusEffect } from '~/hooks/hooks';

import { SCREEN_OPTIONS, UAM_SCREENS } from './common/constants/constants';

const UAM: FC = () => {
  const NativeStack = createNativeStackNavigator<UamNavigationParamList>();
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
      {UAM_SCREENS.map((screen) => {
        return (
          <NativeStack.Screen
            key={screen.name}
            name={screen.name as UamScreenName}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { UAM };
