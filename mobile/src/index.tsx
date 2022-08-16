import React, { FC } from 'react';

import { Provider as StoreProvider } from 'react-redux';

import { App } from '~/components/app/app';
import { store } from '~/store/store';

const Root: FC = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

export { Root };
