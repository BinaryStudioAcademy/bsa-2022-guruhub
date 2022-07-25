import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'fast-text-encoding';

import { Root as RootNavigation } from '~/navigation/root/root.navigation';
import { store } from '~/store/store';
import { styles } from './styles';

const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <GestureHandlerRootView style={styles.rootView}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

export { App };
