import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'fast-text-encoding';

import { Root as RootNavigation } from '~/navigation/root/root.navigation';
import { styles } from './styles';

const App: FC = () => {
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export { App };
