import React, { FC } from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { store } from '~/store/store';
import { App } from '~/components/app/app';

const Root: FC = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

export { Root };
