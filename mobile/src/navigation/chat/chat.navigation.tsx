import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { ChatScreenName } from '~/common/enums/enums';
import { ChatNavigationParamList } from '~/common/types/types';
import { useAppNavigate, useCallback, useFocusEffect } from '~/hooks/hooks';

import { CHAT_SCREENS, SCREEN_OPTIONS } from './common/constants/constants';

const Chat: FC = () => {
  const NativeStack = createNativeStackNavigator<ChatNavigationParamList>();
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
      {CHAT_SCREENS.map((screen) => {
        return (
          <NativeStack.Screen
            key={screen.name}
            name={screen.name as ChatScreenName}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </NativeStack.Navigator>
  );
};

export { Chat };
