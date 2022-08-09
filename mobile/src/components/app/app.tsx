import 'fast-text-encoding';

import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { linking } from '~/config/config';
import { Root as RootNavigation } from '~/navigation/root/root.navigation';

import { styles } from './styles';

const App: FC = () => {
  const handleNavigationReady = (): void => {
    RNBootSplash.hide({ fade: true });
  };

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <NavigationContainer linking={linking} onReady={handleNavigationReady}>
        <RootNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export { App };
