import 'assets/css/styles.scss';

import { StrictMode } from 'react';

import { App } from 'components/app/app';
import { Toast } from 'components/common/common';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'store/store';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <Toast />
      </Router>
    </Provider>
  </StrictMode>,
);
