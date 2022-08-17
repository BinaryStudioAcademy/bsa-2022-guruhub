import 'fast-text-encoding';

import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { linking, navigationTheme } from '~/config/config';
import { Root as RootNavigation } from '~/navigation/root/root.navigation';

import { Toast } from '../common/common';
import { styles } from './styles';

const App: FC = () => {
  const handleNavigationReady = (): void => {
    RNBootSplash.hide({ fade: true });
  };

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <NavigationContainer
        theme={navigationTheme}
        linking={linking}
        onReady={handleNavigationReady}
      >
        <RootNavigation />
      </NavigationContainer>
      <Toast />
    </GestureHandlerRootView>
  );
};

export { App };
