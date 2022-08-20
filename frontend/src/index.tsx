import 'assets/css/styles.scss';

import { App } from 'components/app/app';
import { Toast } from 'components/common/common';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { navigation as navigationService } from 'services/services';
import { store } from 'store/store';

const root = createRoot(document.getElementById('root') as HTMLElement);

const { history } = navigationService;

root.render(
  <StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App />
        <Toast />
      </HistoryRouter>
    </Provider>
  </StrictMode>,
);
