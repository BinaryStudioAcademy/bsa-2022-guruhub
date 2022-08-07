import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';
import 'fast-text-encoding';
import { Root as RootNavigation } from '~/navigation/root/root.navigation';
import { styles } from './styles';
import { ENV } from '~/common/enums/enums';

const App: FC = () => {
  const handleNavigationReady = (): void => {
    RNBootSplash.hide({ fade: true });
  };

  const linking = {
    prefixes: [ENV.APP.APP_HOST, ENV.APP.APP_SCHEME],
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
