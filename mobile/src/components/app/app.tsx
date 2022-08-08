import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';
import 'fast-text-encoding';

import { Root as RootNavigation } from '~/navigation/root/root.navigation';
import { linking } from '~/config/config';
import { styles } from './styles';
import { CustomToast } from '../common/toast/toast';

const App: FC = () => {
  const handleNavigationReady = (): void => {
    RNBootSplash.hide({ fade: true });
  };

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <NavigationContainer linking={linking} onReady={handleNavigationReady}>
        <RootNavigation />
      </NavigationContainer>
      <CustomToast />
    </GestureHandlerRootView>
  );
};

export { App };
